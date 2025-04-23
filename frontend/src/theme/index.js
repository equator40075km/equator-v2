import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

import { recipes } from "./recipes"
import { slotRecipes } from "./slot-recipes"

const config = defineConfig({
    globalCss: {
        "*": {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontFeatureSettings: 'normal',
        },
        "ul": {
            listStyle: 'initial',
        },
        "ol": {
            listStyleType: 'decimal',
        },
    },
    theme: {
        recipes,
        slotRecipes,
    },
})

export const system = createSystem(defaultConfig, config)
