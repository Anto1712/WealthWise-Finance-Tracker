import { z } from "zod";

/**
 * Category applies to either income or expense transactions.
 */
export const categoryTypeEnum = z.enum(["income", "expense"]);

/**
 * Hex color validator.
 */
const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Schema for creating a new category.
 */
export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(30, "Category name must be at most 30 characters"),
  icon: z.string().trim().min(1, "Icon is required").max(10, "Icon must be at most 10 characters"),
  color: z.string().regex(hexColorRegex, "Color must be a valid hex color (e.g. #ef4444)"),
  type: categoryTypeEnum,
});

/**
 * Schema for updating an existing category. All fields are optional.
 */
export const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(30, "Category name must be at most 30 characters")
    .optional(),
  icon: z
    .string()
    .trim()
    .min(1, "Icon is required")
    .max(10, "Icon must be at most 10 characters")
    .optional(),
  color: z
    .string()
    .regex(hexColorRegex, "Color must be a valid hex color (e.g. #ef4444)")
    .optional(),
  type: categoryTypeEnum.optional(),
});

/**
 * Schema representing the category object returned from the API.
 */
export const categoryResponseSchema = z.object({
  id: z.string(),
  userId: z.string().nullable(),
  name: z.string(),
  icon: z.string(),
  color: z.string(),
  type: categoryTypeEnum,
  isDefault: z.boolean(),
  createdAt: z.string().datetime(),
});
