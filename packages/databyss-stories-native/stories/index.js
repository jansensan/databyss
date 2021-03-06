import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Typography from '@databyss-org/ui/stories/System/Typography'
import Views from '@databyss-org/ui/stories/System/Views'
import Controls from '@databyss-org/ui/stories/System/Controls'
import TextInputs from '@databyss-org/ui/stories/System/TextInputs'
import Buttons from '@databyss-org/ui/stories/System/Buttons'
import {
  NotifyMessage,
  NotifyError,
  TriggerError,
} from '@databyss-org/ui/stories/Components/Notifys'
import Icons from '@databyss-org/ui/stories/System/Icons'
import Modals, { Dialogs } from '@databyss-org/ui/stories/System/Modals'
import ListControl, {
  ItemSeparators,
  ComplexItems,
} from '@databyss-org/ui/stories/System/List'
import { ThemeDecorator, ContentDecorator, NotifyDecorator } from './decorators'

storiesOf('Design System', module)
  .addDecorator(ThemeDecorator)
  .addDecorator(ContentDecorator)
  .add('Typography', () => <Typography />)
  .add('Views', () => <Views />)
  .add('Controls', () => <Controls />)
  .add('TextInputs', () => (
    <React.Fragment>
      <TextInputs />
      <TextInputs rich />
    </React.Fragment>
  ))
  .add('Buttons', () => <Buttons />)
  .add('Icons', () => <Icons />)
  .add('List', () => (
    <React.Fragment>
      <ListControl />
      <ItemSeparators />
      <ComplexItems />
    </React.Fragment>
  ))
  .add('Modals', () => (
    <React.Fragment>
      <Modals />
      <Dialogs />
    </React.Fragment>
  ))

storiesOf('Notify', module)
  .addDecorator(NotifyDecorator)
  .addDecorator(ThemeDecorator)
  .addDecorator(ContentDecorator)
  .add('Notify', () => (
    <React.Fragment>
      <NotifyMessage />
      <NotifyError />
      <TriggerError />
    </React.Fragment>
  ))
