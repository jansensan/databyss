import React from 'react'
import BaseControl from './BaseControl'
import { View, Text } from '../'

/**
 * Base component for boolean selection controls. Optionally renders a label
 */
const ToggleControl = ({
  value,
  children,
  onChange,
  disabled,
  label,
  alignLabel,
  labelProps,
  textVariant,
  ...others
}) => (
  <BaseControl
    childViewProps={
      label && label.length
        ? {
            flexDirection: alignLabel === 'left' ? 'row-reverse' : 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }
        : {}
    }
    onPress={() => onChange(!value)}
    disabled={disabled}
    {...others}
  >
    {children}
    {label &&
      label.length && (
        <View
          {...{ [alignLabel === 'right' ? 'ml' : 'mr']: 'small' }}
          {...labelProps}
        >
          <Text variant={textVariant}>{label}</Text>
        </View>
      )}
  </BaseControl>
)

ToggleControl.defaultProps = {
  alignLabel: 'right',
  textVariant: 'uiTextSmall',
  onChange: () => null,
}

export default ToggleControl
