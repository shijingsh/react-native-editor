import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Platform
} from 'react-native';
import {RichTextEditor, RichTextToolbar} from 'react-native-editor';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class RichTextExample extends Component {

  constructor(props) {
    super(props);
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  onPressInsert=()=>{
    this.richtext.setContentHTML("<p>insert by setContentHTML</p>");
  }

  onPressAppendInsert=()=>{
    this.richtext.appendContentHTML("<p>append by appendContentHTML</p>");
  }

  onPressGotFocus=()=>{
      this.richtext.focusContent();
  }

  onEditorInitialized() {

  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row',height:50,        alignItems: 'center',
            justifyContent: 'center',backgroundColor:'#847b66'}}>
            <TouchableOpacity style={{marginLeft:20,padding:5}} onPress={this.onPressInsert}>
              <Text>insert HTML</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:20,padding:5}} onPress={this.onPressAppendInsert}>
              <Text>append HTML</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:20,padding:5}} onPress={this.onPressGotFocus}>
              <Text>got Focus</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerRichText}>
            <RichTextEditor
                ref={(r)=>this.richtext = r}
                style={styles.richText}
                initialTitleHTML={'Title!!'}
                hiddenTitle = {true}
                initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
                editorInitializedCallback={() => this.onEditorInitialized()}
            />
            <RichTextToolbar
                getEditor={() => this.richtext}
            />
            {Platform.OS === 'ios' && <KeyboardSpacer/>}
          </View>

        </View>
    );
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    //alert(titleHtml + ' ' + contentHtml)
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
   // paddingTop: 40
  },
  containerRichText: {
    flex: 1,
    flexDirection: 'column'
  },
  richText: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

