import React, { useState, useCallback } from 'react';

import { Container, VStack, Heading, Select, NumberInput, NumberInputField, Text } from "@chakra-ui/react"

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
    setVolume(nValue  * ingredient.centilitreParGramme);
  }, [ingredient]);

  const handleVolumeChange = useCallback((value) => {
    const nValue = Number(value);
    setVolume(nValue);
    setMasse(nValue / ingredient.centilitreParGramme);
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
        <Heading>
          Doser
        </Heading>
        <Text mb="8px">Ingredient</Text>
        <Select
          value={ingredient.name}
          onChange={handleIngredientChange}
          boxShadow="xs" rounded="md" bg="white"
        >
          {ingredients.map(ingredient => (
            <option
              value={ingredient.name}
              key={ingredient.name}
            >{ingredient.name}</option>
          ))}
        </Select>
        <Text mb="8px">Masse (g)</Text>
        <NumberInput precision={2} min={0} value={masse} onChange={handleMasseChange} w="100%">
          <NumberInputField boxShadow="xs" p="6" rounded="md" bg="white"/>
        </NumberInput>
        <Text mb="8px">Volume (cl)</Text>
        <NumberInput precision={2} min={0} value={volume} onChange={handleVolumeChange} w="100%" >
          <NumberInputField boxShadow="xs" p="6" rounded="md" bg="white"/>
        </NumberInput>
      </VStack>
    </Container>
  );
}

export default Home;
