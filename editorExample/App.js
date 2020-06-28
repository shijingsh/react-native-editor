import React, {Component} from 'react';
import {Appearance, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-editor';

const initHTML = `<br/>
<center><b>Pell.js Rich Editor</b></center>
<center>React Native</center>
<br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" ></br></br>
</br></br>
`;


export default class RichTextExample extends Component {
  richText = React.createRef();
  constructor(props) {
    super(props);
    const that = this;
    const theme = props.theme || Appearance.getColorScheme();
    const contentStyle = that.createContentStyle(theme);
    that.state = {theme: theme, contentStyle};
    //that.onHome = ::that.onHome;
    //that.save = ::that.save;
    //that.onTheme = ::that.onTheme;
    //that.onPressAddImage = ::that.onPressAddImage;
    //that.themeChange = ::that.themeChange;
  }

  onPressInsert=()=>{
    //this.richtext.setContentHTML("<p>insert by setContentHTML</p>");
  }

  onPressAppendInsert=()=>{
    //this.richtext.appendContentHTML("<p>append by appendContentHTML</p>");
  }

  onPressGotFocus=()=>{
      //this.richtext.focusContent();
  }

  onPressAddImage=()=> {
    // insert URL
    this.richText.current?.insertImage(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    this.richText.current?.blurContentEditor();
  }

  createContentStyle=(theme)=>  {
    const contentStyle = {backgroundColor: '#000033', color: '#fff', placeholderColor: 'gray'};
    if (theme === 'light') {
      contentStyle.backgroundColor = '#fff';
      contentStyle.color = '#000033';
      contentStyle.placeholderColor = '#a9a9a9';
    }
    return contentStyle;
  }

  async save() {
    // Get the data here and call the interface to save the data
    let html = await this.richText.current?.getContentHtml();
    // console.log(html);
    alert(html);
  }

  render() {
    let that = this;
    const {contentStyle, theme} = that.state;
    const {backgroundColor, color, placeholderColor} = contentStyle;
    const themeBg = {backgroundColor};
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
          <View>
            <RichEditor
                editorStyle={contentStyle}
                containerStyle={themeBg}
                ref={that.richText}
                style={[styles.rich, themeBg]}
                placeholder={'please input content'}
                initialContentHTML={initHTML}
            />
            <RichToolbar
                style={[styles.richBar, themeBg]}
                editor={that.richText}
                iconTint={color}
                selectedIconTint={'#2095F2'}
                selectedButtonStyle={{backgroundColor: 'transparent'}}
                onPressAddImage={that.onPressAddImage}
            />
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
    backgroundColor: '#F5FCFF',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  scroll: {
    backgroundColor: '#ffffff',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },
});

