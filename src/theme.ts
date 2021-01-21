import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    bg_neu: '#58297f',
  },
  layerStyles: {
    neumorph: {
      borderRadius:'10px',
      background:'#58297f',
      boxShadow:' 5px 5px 20px #2b143e, -5px -5px 20px #853ec0;',
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#58297f',
        color: "white",
      },
    },
  },
})

export default theme