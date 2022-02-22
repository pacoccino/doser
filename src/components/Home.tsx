import React, { useState, useCallback, useEffect } from "react";

import {
  HStack,
  Button,
  Input,
  Box,
  Flex,
  Container,
  VStack,
  Select,
  NumberInput,
  NumberInputField,
  Text,
  Wrap,
  WrapItem,
  useNumberInput,
} from "@chakra-ui/react";

import { useDoserContext } from "../contexts/doser";
import Decimal from "decimal.js";

function arrondir(n, d = 2) {
  return new Decimal(n).toDP(d).toNumber();
}

const Info = ({
  title,
  value,
  unite,
}: {
  title: string;
  value: number | string;
  unite?: string;
}) => (
  <Flex direction="column" align="center">
    <Text mb={1} fontSize="sm" fontWeight={300}>
      {title}
    </Text>
    <Flex align="end">
      <Text>{value}</Text>
      {unite && (
        <Text fontSize="xs" as="i" ml={0.5} mb={0.5}>
          {unite}
        </Text>
      )}
    </Flex>
  </Flex>
);
const NInput = ({ value, onChange }) => (
  <NumberInput precision={2} min={0} value={value} onChange={onChange} w="100%">
    <NumberInputField layerStyle="neumorph" />
  </NumberInput>
);

const Field = ({
  input,
  title,
  unite,
}: {
  input: any;
  title: string;
  unite?: string;
}) => (
  <Box w="100%">
    <Flex justify="space-between" mb={2} mx={2}>
      <Text fontSize="sm">{title}</Text>
      <Text fontSize="sm">{unite}</Text>
    </Flex>
    {input}
  </Box>
);

const Split = () => <Box borderBottom="1px solid #9f9fd3a8" w="100%" />;
const SubTitle = ({ children, ...props }) => (
  <Text align="center" textTransform="uppercase" fontWeight={300} {...props}>
    {children}
  </Text>
);

function Home() {
  const {
    selectedIngredient,
    setSelectedIngredient,
    ingredients,
    nbPersonnes,
    setNbPersonnes,
  } = useDoserContext();

  const [masse, setMasse] = useState<number>(100);
  const [volume, setVolume] = useState<number>(
    () => masse / selectedIngredient.poidsVolume
  );

  const handleMasseChange = useCallback(
    (value) => {
      const nValue = Number(value);
      setMasse(nValue);
      setVolume(Math.round(nValue / selectedIngredient.poidsVolume));
    },
    [selectedIngredient]
  );

  const handleVolumeChange = useCallback(
    (value) => {
      const nValue = Number(value);
      setVolume(nValue);
      setMasse(Math.round(nValue * selectedIngredient.poidsVolume));
    },
    [selectedIngredient]
  );

  const handleIngredientChange = useCallback(
    (e) => {
      const name = e.target.value;
      const selectedIngredient = ingredients.find((i) => i.name === name);
      if (!selectedIngredient) return;
      setSelectedIngredient(selectedIngredient);
      setMasse(masse);
      setVolume(masse / selectedIngredient.poidsVolume);
    },
    [masse]
  );

  const {
    value: inputPersonValue,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 2,
    min: 1,
    max: 30,
    precision: 0,
  });

  useEffect(() => {
    setNbPersonnes(inputPersonValue);
  }, [inputPersonValue]);

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({});

  return (
    <Container mb={8}>
      <VStack spacing={4}>
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          casing="uppercase"
        >
          Doser
        </Text>

        <Field
          title={"Ingredient"}
          input={
            <Select
              value={selectedIngredient.name}
              onChange={handleIngredientChange}
              layerStyle="neumorph"
            >
              {ingredients.map((selectedIngredient) => (
                <option
                  value={selectedIngredient.name}
                  key={selectedIngredient.name}
                >
                  {selectedIngredient.name}
                </option>
              ))}
            </Select>
          }
        />

        <Wrap spacing={4}>
          {selectedIngredient.tempsCuisson && (
            <WrapItem>
              <Info
                title={"Temps cuisson"}
                value={selectedIngredient.tempsCuisson}
                unite="min"
              />
            </WrapItem>
          )}
          {selectedIngredient.volumeEau && (
            <WrapItem>
              <Info
                title={"Volume d'eau"}
                value={selectedIngredient.volumeEau}
              />
            </WrapItem>
          )}
          {selectedIngredient.poidsPersonne && (
            <WrapItem>
              <Info
                title={"Poids/personne"}
                value={selectedIngredient.poidsPersonne * 1000}
                unite="g"
              />
            </WrapItem>
          )}
          {selectedIngredient.volumeCuitCru && (
            <WrapItem>
              <Info
                title={"Volume Cuit/Cru"}
                value={selectedIngredient.volumeCuitCru}
                unite="L/L"
              />
            </WrapItem>
          )}
        </Wrap>

        {selectedIngredient.remarques && (
          <>
            <Info title={"Remarques"} value={selectedIngredient.remarques} />
          </>
        )}

        {selectedIngredient.poidsPersonne && (
          <>
            <Split />
            <SubTitle>Personnes</SubTitle>

            <HStack>
              <Button {...dec} width="100px">
                -
              </Button>
              <Input {...input} width="100px" align="center" />
              <Button {...inc} width="100px">
                +
              </Button>
            </HStack>

            <Wrap>
              <WrapItem>
                <Info
                  title={"Quantité"}
                  value={arrondir(
                    selectedIngredient.poidsPersonne * nbPersonnes * 1000
                  )}
                  unite="g"
                />
              </WrapItem>
              {selectedIngredient.poidsVolume && (
                <WrapItem>
                  <Info
                    title={"Quantité"}
                    value={arrondir(
                      (selectedIngredient.poidsPersonne * nbPersonnes * 1000) /
                        selectedIngredient.poidsVolume,
                      0
                    )}
                    unite="cl"
                  />
                </WrapItem>
              )}
              {selectedIngredient.volumeEau && (
                <WrapItem>
                  <Info
                    title={"Quantité eau"}
                    value={arrondir(
                      ((selectedIngredient.poidsPersonne * nbPersonnes * 1000) /
                        selectedIngredient.poidsVolume) *
                        selectedIngredient.volumeEau,
                      0
                    )}
                    unite="cl"
                  />
                </WrapItem>
              )}
            </Wrap>
          </>
        )}

        {selectedIngredient.poidsVolume && (
          <Flex w="100%" direction="column" align="stretch">
            <Split />
            <SubTitle mb={2} mt={2}>
              Convertisseur Poids/Volume
            </SubTitle>
            <Field
              title="Poids"
              unite="g"
              input={<NInput value={masse} onChange={handleMasseChange} />}
            />
            <Box mb={4} />
            <Field
              title="Volume"
              unite="cl"
              input={<NInput value={volume} onChange={handleVolumeChange} />}
            />
          </Flex>
        )}
      </VStack>
    </Container>
  );
}

export default Home;
