// https://github.com/victorbalssa/abacus/blob/develop/plugins/withAndroidStyles.js

const { AndroidConfig, withAndroidStyles } = require('@expo/config-plugins');

const setStrings = (modResults) => {
  let newStyles = { ...modResults };

  newStyles = AndroidConfig.Styles.setStylesItem({
    item: { $: { name: 'android:textColor' }, _: '#FFFFFF' },
    parent: {
      parent: 'Theme.AppCompat.Light.NoActionBar',
      name: 'AppTheme',
    },
    xml: newStyles,
  });

  newStyles = AndroidConfig.Styles.setStylesItem({
    item: { $: { name: 'android:popupMenuStyle' }, _: '@style/popupOverflowMenu' },
    parent: {
      parent: 'Theme.AppCompat.Light.NoActionBar',
      name: 'AppTheme',
    },
    xml: newStyles,
  });
  
  newStyles = AndroidConfig.Styles.setStylesItem({
    item: { $: { name: 'android:popupBackground' }, _: '@drawable/popupmenu_background' },
    parent: {
      parent: '@style/Widget.AppCompat.PopupMenu.Overflow',
      name: 'popupOverflowMenu',
    },
    xml: newStyles,
  });

  return newStyles;
};

module.exports = function withAndroidStylesUpdates(configuration) {
  return withAndroidStyles(configuration, (config) => {
    const newConfig = { ...config };

    newConfig.modResults = setStrings(newConfig.modResults);

    return newConfig;
  });
};