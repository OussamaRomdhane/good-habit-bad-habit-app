import React from 'react';
import ParallaxScrollView from '../../ParallaxScrollView';
import {ThemedText} from '../../ThemedText';
import {ThemedView} from '../../ThemedView';
import {IconSymbol} from '../../ui/IconSymbol';

import {styles} from './SettingsScreen.styles';
import {Button} from 'react-native-ui-lib';
import {getSecondaryHabitTypeColor} from '../../../utils/colors';
import {useSetAtom} from 'jotai';
import {clearTrackedHabitsAtom} from '../../../state/trackedHabits';

export function SettingsScreen() {
  const clearTrackedHabits = useSetAtom(clearTrackedHabitsAtom);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="settings"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>
      <Button
        backgroundColor={getSecondaryHabitTypeColor('bad')}
        label="Delete all data"
        children={<IconSymbol size={20} color="white" name="delete-outline" />}
        // TODO: add confirmation modal
        onPress={clearTrackedHabits}
      />
    </ParallaxScrollView>
  );
}
