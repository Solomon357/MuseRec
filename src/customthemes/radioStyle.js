import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'


const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  label: {
    fontFamily: 'mono', // change the font family of the label
  },
  control: {
    _hover: {
        border: "2px solid orange",
        outline: "6px solid",
        outlineColor: "orange.100"
        
    },
  },
})

//defining custom size  ** (USEFUL IF I HAVE MANY SIZES TO DEFINE)

/* const xl = defineStyle({
   control: {
     w: '8',
     h: '8',
   },
   label: {
     //fontSize: "xl"
   }
 })  **/

const sizes = {
    xl: definePartsStyle({ 
      control: {
        w: '8',
        h: '8',
      },
      label: {
        fontSize: "xl"
      }
    }),
  }

export const radioTheme = defineMultiStyleConfig({ baseStyle, sizes })