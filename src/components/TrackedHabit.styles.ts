import {StyleSheet} from 'react-native';
import {Colors, Spacings} from 'react-native-ui-lib';

import {getSecondaryHabitTypeColor} from '../utils/colors';

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 0,
    marginVertical: 10,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Spacings.s2,
    padding: 0,
  },
  cardIcon: {
    height: 100,
    borderColor: 'black',
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: '0%',
    borderBottomRightRadius: '50%',
  },
  cardIconGood: {
    borderWidth: 3,
    backgroundColor: Colors.green70,
    borderColor: getSecondaryHabitTypeColor('good'),
  },
  cardIconBad: {
    borderWidth: 3,
    backgroundColor: Colors.red70,
    borderColor: getSecondaryHabitTypeColor('bad'),
  },
  lastDidBadge: {
    position: 'absolute',
    top: parseInt(`-${Spacings.s2}`, 10),
    right: -2,
  },
  cardDescription: {
    height: 100,
    borderColor: 'black',
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacings.s2,
    padding: Spacings.s2,
  },
  cardStreakIcon: {
    height: 50,
    borderColor: 'black',
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '0%',
    padding: Spacings.s4,
    paddingRight: Spacings.s2,
  },
  cardStreakIconGood: {
    backgroundColor: getSecondaryHabitTypeColor('good'),
  },
  cardStreakIconBad: {
    backgroundColor: getSecondaryHabitTypeColor('bad'),
  },
  cardStreakIconNoStreak: {opacity: 0.3},
});

export {styles};
