/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PokeballLogo, PokemonLogo} from '../../assets';
import {generateIdImage, getLinkImage} from '../../helper/general';
import {getPokemon} from '../../redux/pokemonSlice';

const HomePokemon = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: any) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemon());
  }, []);

  // eslint-disable-next-line react/no-unstable-nested-components
  const CardPoke = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailsPokemon', {
            name: item?.name,
            url: item?.url,
            image: getLinkImage(generateIdImage(item?.url)),
          });
        }}
        style={styles.containerCard}>
        <Image
          source={{uri: getLinkImage(generateIdImage(item?.url))}}
          style={styles.iconPokeball}
        />
        <View style={styles.bodyName}>
          <Text style={styles.titleName}>{item?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logoPokemon} source={PokemonLogo} />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 20}}>
              {data?.length}
            </Text>
          </View>
          <Image style={styles.logoPokeball} source={PokeballLogo} />
        </View>
      </View>
      <View style={styles.containerBody}>
        <FlatList
          renderItem={CardPoke}
          numColumns={2}
          data={data}
          onEndReached={() => {
            dispatch(getPokemon());
          }}
          // ListFooterComponent={() => (
          //   <View>
          //     <Text>Loading</Text>
          //   </View>
          // )}
        />
      </View>
    </View>
  );
};

export default HomePokemon;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoPokemon: {
    width: 100,
    height: 35,
  },
  logoPokeball: {
    width: 50,
    height: 50,
    marginLeft: 6,
  },
  containerCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef5350',
    borderRadius: 140 / 2,
    margin: 14,
    paddingBottom: 10,
    width: 140,
    height: 140,
  },
  iconPokeball: {
    width: 80,
    height: 80,
  },
  bodyName: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    textAlign: 'center',
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  titleName: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  containerBody: {
    alignItems: 'center',
  },
});
