import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Category } from "../models/category.model";
import { ApiError } from "../utils/api-error";

/**
 * GET /categories
 * Returns system default categories (userId = null) and user-specific categories.
 */
export const list = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Category.find({
    $or: [{ userId: null }, { userId: req.userId! }],
  }).sort({ type: 1, name: 1 });

  const formatted = categories.map((cat) => ({
    id: cat._id.toString(),
    userId: cat.userId ? cat.userId.toString() : null,
    name: cat.name,
    icon: cat.icon,
    color: cat.color,
    type: cat.type,
    isDefault: cat.isDefault,
    createdAt: cat.createdAt.toISOString(),
  }));

  res.status(200).json({
    success: true,
    data: formatted,
  });
});

/**
 * POST /categories
 * Create a user-specific custom category.
 */
export const create = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.create({
    userId: req.userId!,
    ...req.body,
    isDefault: false,
  });

  res.status(201).json({
    success: true,
    data: {
      id: category._id.toString(),
      userId: category.userId ? category.userId.toString() : null,
      name: category.name,
      icon: category.icon,
      color: category.color,
      type: category.type,
      isDefault: category.isDefault,
      createdAt: category.createdAt.toISOString(),
    },
  });
});

/**
 * PATCH /categories/:id
 * Only user-owned categories can be updated (not system defaults).
 */
export const update = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw ApiError.notFound("Category not found");
  }

  // Cannot edit system default categories
  if (category.isDefault && category.userId === null) {
    throw ApiError.forbidden("System default categories cannot be modified");
  }

  // Ensure the user owns this category
  if (category.userId?.toString() !== req.userId!) {
    throw ApiError.notFound("Category not found");
  }

  const updated = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: {
      id: updated!._id.toString(),
      userId: updated!.userId ? updated!.userId.toString() : null,
      name: updated!.name,
      icon: updated!.icon,
      color: updated!.color,
      type: updated!.type,
      isDefault: updated!.isDefault,
      createdAt: updated!.createdAt.toISOString(),
    },
  });
});

/**
 * DELETE /categories/:id
 * Only user-owned categories can be deleted.
 */
export const remove = asyncHandler(async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw ApiError.notFound("Category not found");
  }

  if (category.isDefault && category.userId === null) {
    throw ApiError.forbidden("System default categories cannot be deleted");
  }

  if (category.userId?.toString() !== req.userId!) {
    throw ApiError.notFound("Category not found");
  }

  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      id: category._id.toString(),
    },
    message: "Category deleted successfully",
  });
});
