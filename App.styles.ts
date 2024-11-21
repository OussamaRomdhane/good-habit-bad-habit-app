import {StyleSheet} from 'react-native';
import {Spacings} from 'react-native-ui-lib';

const styles = StyleSheet.create({
  gestureHandlerRoot: {
    flex: 1,
  },
  drawerItem: {
    marginTop: Spacings.s1,
    marginRight: Spacings.s1,
    marginLeft: Spacings.s1,
    marginBottom: Spacings.s2,
  },
  drawerLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export {styles};
