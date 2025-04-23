import { defineRecipe } from "@chakra-ui/react"

export const inputRecipe = defineRecipe({
    className: "equator-input",
    base: {
        borderRadius: "50px",
    },
    variants: {
        size: {
            md: {
                padding: "16px 20px",
            },
        },
        variant: {
            gray: {
                outline: "0",
                bg: "transparent",
                borderWidth: "2px",
                borderColor: "var(--equator-gray)",
                _focusVisible: {
                    borderWidth: "2px",
                    borderColor: "var(--equator-green)",
                    _placeholder: {
                        color: "var(--equator-green)",
                    },
                }
            },
            green: {
                outline: "0",
                bg: "transparent",
                borderWidth: "1px",
                borderColor: "var(--equator-green)",
                color: 'var(--equator-green)',
                fontWeight: 'bold',
                _placeholder: {
                    color: 'var(--equator-green)',
                    opacity: 0.6,
                    fontWeight: 'normal',
                },
                _hover: {
                    borderColor: 'var(--equator-green-hover)',
                }
            },
        },
    }
})
