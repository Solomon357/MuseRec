import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

//button auto defaults to the "solid" variant,
// so if I want to change any "normal" styles i need to apply those styles 
// to the variant and NOT the baseStyle 
const solid = defineStyle({
  _hover:{
    color:"white",
    bgColor:"orange"
  }
})

export const buttonTheme = defineStyleConfig({
  variants: { solid },
})