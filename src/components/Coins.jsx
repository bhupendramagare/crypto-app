import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  HStack,
  VStack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";

import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Coins = () => {
  //use state hook to dynamically update coins data
  const [coins, setCoins] = useState([]); //Coin is array which contain api data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No Error");
  const [page, setPage] = useState(1);

  // use Effect hook to call api at run time
  useEffect(() => {
    const fetchcoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=inr`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        setErrorMessage(error);
      }
    };
    fetchcoins();
  }, []);

  if (error) return <ErrorComponent message={errorMessage} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      width={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Coin"} />

      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text size={"md"} noOfLines={1}>
        {name}
      </Text>
    </VStack>
  </a>
);

export default Coins;
