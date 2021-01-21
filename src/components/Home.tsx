import React, { useState, useCallback } from 'react';

import { Container, VStack, Select, NumberInput, NumberInputField, Text } from "@chakra-ui/react"

interface Ingredient {
  name: string,
  centilitreParGramme: number;
}
const ingredients: Ingredient[] = [
  {
    name: 'Farine',
    centilitreParGramme: 0.182,
  },
  {
    name: 'Sucre',
    centilitreParGramme: 0.112,
  },
]

function Home() {

  const [ingredient, setIngredient] = useState<Ingredient>(ingredients[0]);
  const [masse, setMasse] = useState<number>(100);
  const [volume, setVolume] = useState<number>(() => masse * ingredient.centilitreParGramme);

  const handleMasseChange = useCallback((value) => {
    const nValue = Number(value);
    setMasse(nValue);
    setVolume(Math.round(nValue  * ingredient.centilitreParGramme));
  }, [ingredient]);

  const handleVolumeChange = useCallback((value) => {
    const nValue = Number(value);
    setVolume(nValue);
    setMasse(Math.round(nValue / ingredient.centilitreParGramme));
  }, [ingredient]);

  const handleIngredientChange = useCallback((e) => {
    const name = e.target.value;
    const ingredient = ingredients.find(i => i.name === name);
    if(!ingredient) return;
    setIngredient(ingredient);
    setMasse(masse);
    setVolume(masse  * ingredient.centilitreParGramme);
  }, [masse]);

  return (
    <Container>
      <VStack spacing={6}>
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          casing="uppercase"
        >
          Doser
        </Text>
        <Text mb="8px">Ingredient</Text>
        <Select
          value={ingredient.name}
          onChange={handleIngredientChange}
          layerStyle="neumorph"
        >
          {ingredients.map(ingredient => (
            <option
              value={ingredient.name}
              key={ingredient.name}
            >{ingredient.name}</option>
          ))}
        </Select>
        <Text mb="8px">Poids (g)</Text>
        <NumberInput precision={2} min={0} value={masse} onChange={handleMasseChange} w="100%">
          <NumberInputField layerStyle="neumorph"/>
        </NumberInput>
        <Text mb="8px">Volume (cl)</Text>
        <NumberInput precision={2} min={0} value={volume} onChange={handleVolumeChange} w="100%" >
          <NumberInputField layerStyle="neumorph"/>
        </NumberInput>
      </VStack>
    </Container>
  );
}

export default Home;
