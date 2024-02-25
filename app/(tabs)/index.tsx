import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Text } from '@/components/Themed';
import { getVisualNovelData } from '@/API/VN';
import { VNResponseType } from '@/Definitions/VNType';
import VNCoverCarousel from '@/components/Carousels/VNCoverCarousel';

export default function HomeTab() {
  const [vnDataRating, setVnDataRating] = useState<VNResponseType | null>(null);
  const [loadingRating, setLoadingRating] = useState(true);

  const [vnDataVotecount, setVnDataVotecount] = useState<VNResponseType | null>(null);
  const [loadingVotecount, setLoadingVotecount] = useState(true);

  const apiOptionsRating = {
    fields: VNFields,
    sort: "rating",
    reverse: true,
    results: 10
  };

  const apiOptionsVotecount = {
    fields: VNFields,
    sort: "votecount",
    reverse: true,
    results: 10
  };

  useEffect(() => {
    getVisualNovelData(apiOptionsRating, false)
      .then((data: VNResponseType) => { 
        setVnDataRating(data);
        setLoadingRating(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingRating(false);
      });

      getVisualNovelData(apiOptionsVotecount, false)
      .then((data: VNResponseType) => { 
        setVnDataVotecount(data);
        setLoadingVotecount(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingVotecount(false);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Home</Text>
      {loadingRating && loadingVotecount ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        vnDataRating && vnDataVotecount && (
          <>
            <Text style={styles.title}>Top By Rating</Text>
            <VNCoverCarousel vnsData={vnDataRating.results} height={250} />

            <Text style={styles.title}>Top By Votes</Text>
            <VNCoverCarousel vnsData={vnDataVotecount.results} height={200} />
          </>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#06101C',
  },
  header: {
    paddingLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 20
  },
  title: {
    paddingLeft: 20,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 20
  }
});

const VNFields = [
  "title",
  "image.url",
  "image.sexual",
  "image.violence"
].join(",");