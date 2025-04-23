import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
    className: "equator-button",
    base: {
        borderRadius: "var(--btn-border-radius)",
        fontWeight: "semibold",
        lineHeight: "100%",
    },
    variants: {
        size: {
            md: {
                fontSize: '16px',
                padding: "14px 32px",
                _icon: {
                    width: "16px",
                    height: "16px",
                },
            },
        },
        variant: {
            white: {
                bg: "white",
                color: "var(--equator-black)",
                _hover: {
                    bg: "var(--equator-black)",
                    color: "white",
                },
            },
            whiteOutline: {
                bg: "transparent",
                color: "white",
                borderWidth: "2px",
                borderColor: "white",
                _hover: {
                    bg: "white",
                    color: "var(--equator-black)",
                },
            },
            blackOutline: {
                bg: "transparent",
                color: "var(--equator-black)",
                borderWidth: "2px",
                borderColor: "var(--equator-black)",
                _hover: {
                    bg: "var(--equator-black)",
                    color: "white",
                },
            },
            green: {
                bg: "var(--equator-green)",
                color: "white",
                _hover: {
                    bg: "var(--equator-black)",
                    color: "white",
                },
            },
            greenOutline: {
                bg: "transparent",
                color: "var(--equator-green)",
                borderWidth: "2px",
                borderColor: "var(--equator-green)",
                _hover: {
                    bg: "var(--equator-green)",
                    color: "white",
                },
            },
            socialIcon: {
                bg: "transparent",
                color: "var(--equator-darkgray)",
                borderWidth: "2px",
                borderColor: "var(--equator-gray)",
                _hover: {
                    bg: "var(--equator-green)",
                    color: "white",
                    borderColor: "var(--equator-green)",
                },
            },
            profile: {
                bg: "transparent",
                color: "black",
                borderColor: "transparent",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "left",
                _icon: {
                    h: "24px",
                    w: "24px",
                },
                _hover: {
                    bg: "var(--equator-lightgray)"
                },
            },
            carousel: {
                padding: 0,
                bg: "transparent",
                color: "var(--equator-black)",
                borderColor: "var(--equator-gray)",
                borderRadius: "100%",
                _icon: {
                    h: "24px",
                    w: "24px",
                },
                _hover: {
                    bg: "var(--equator-black)",
                    color: "white",
                    borderColor: "var(--equator-black)",
                },
            },
            icon: {
                h: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, auto)',
                gridTemplateRows: '100%',
                gap: '0',
                padding: 0,
                bg: "transparent",
                color: "var(--equator-black)",
                _icon: {
                    margin: '0 4px',
                    h: "100%",
                    w: "100%",
                },
            }
        },
    },
    defaultVariants: {
        variant: "whiteOutline",
        size: "md",
    },
})
