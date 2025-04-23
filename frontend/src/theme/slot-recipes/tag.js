import { defineSlotRecipe } from "@chakra-ui/react"

export const tagSlotRecipe = defineSlotRecipe({
    className: "equator-tag",
    base: {
        root: {
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "var(--btn-border-radius)",
        },
    },
    variants: {
        variant: {
            greenOutline: {
                root: {
                    bg: "transpanent",
                    color: "var(--equator-green)",
                    borderColor: "var(--equator-green)",
                },
            },
            green: {
                root: {
                    bg: "green.50",
                    color: "green.500",
                    borderColor: "green.500",
                },
            },
            orange: {
                root: {
                    bg: "orange.50",
                    color: "orange.500",
                    borderColor: "orange.500",
                },
            },
        },
    },
    defaultVariants: {
        variant: "greenOutline",
    },
})