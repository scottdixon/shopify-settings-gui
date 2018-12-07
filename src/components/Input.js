import React from 'react';
import Color from './Color';
import Heading from './Heading';
import ImagePicker from './ImagePicker';
import TextArea from './TextArea';
import {
  TextField,
  ChoiceList,
  Checkbox,
  Select,
  RangeSlider,
} from '@shopify/polaris';
import { Draggable } from 'react-beautiful-dnd';

const inputMap = {
  header: Heading,
  color: Color,
  text: TextField,
  textarea: TextArea,
  radio: ChoiceList,
  checkbox: Checkbox,
  select: Select,
  range: RangeSlider,
  image_picker: ImagePicker,
}

const translate = (content) => {
  if (typeof(content) === 'object') {
    // Pull out english if it's available otherwise the first translation
    return content['en'] || content[Object.keys(content)[0]]
  } else {
    return content;
  }
}

function Input(props) {
  const settings = {...props}
  settings.value = settings.default
  settings.helpText = translate(settings.info)
  settings.label = translate(settings.label)
  settings.content = translate(settings.content)
  settings.choices = settings.options
  settings.selected = settings.default

  const DynamicComponent = inputMap[settings.type]
  return (
    <Draggable draggableId={settings.id} index={parseInt(settings.originalIndex)}>
    {provided => {
      return (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="draggable">
          { DynamicComponent ? <DynamicComponent {...settings} /> : <p><strong>{settings.type}</strong> not supported yet!</p> }
        </div>
      )
    }}
    </Draggable>
  )

}

export default Input;
