import { 
  Image, 
  StyleSheet, 
  Platform , 
  ScrollView , 
  SafeAreaView ,
  Text,
  Dimensions,
  View

} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


const { width } = Dimensions.get('window');
const numColumns = 2;

const data = [
  { id: '1', image: 'https://picsum.photos/id/1/200/300', title: 'Nature' },
  { id: '2', image: 'https://picsum.photos/id/2/200/400', title: 'Architecture' },
  { id: '3', image: 'https://picsum.photos/id/3/200/250', title: 'Travel' },
  { id: '4', image: 'https://picsum.photos/id/4/200/350', title: 'Food' },
  { id: '5', image: 'https://picsum.photos/id/5/200/300', title: 'Fashion' },
  { id: '6', image: 'https://picsum.photos/id/6/200/400', title: 'Art' },
];


export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Welcome back!</ThemedText>
            <HelloWave />
          </ThemedView>
        

        {/*home images !*/}
        <View style={styles.masonry}>
          {data.map((item, index) => (
            <View key={item.id} style={[styles.item, index % 2 === 0 ? { marginRight: 8 } : {}]}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
          ))}
        </View>
        {/*home images !*/}


        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  title : {
    fontSize : 26
  },

  titleContainer: {
    paddingTop : 10,
    paddingLeft : 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  masonry: {
    paddingTop : 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },

  item: {
    width: (width - 24) / numColumns,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },

});
