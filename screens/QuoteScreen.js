import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Subscribe } from 'unstated';
import { List, ListItem, Text, Right, Icon, Body, Form, Item, Input, Button } from 'native-base';


import StateContainer from '../state/StateContainer';


export default class QuoteScreen extends React.Component {
    static navigationOptions = {
        // header: null,
        title: 'Quotes',
    };

    constructor(props){
        super(props)

        this.state={
            quote: ""
        }
    }

    handleQuoteList = (quotes, removeQuote) => {
        return quotes.map((quote, index) => (
            <ListItem key={index}>
                <Body>
                    <Text>{quote}</Text>
                </Body>

                <Right>
                    <TouchableOpacity onPress={() => { removeQuote(index) }}>
                        <Icon type="Entypo" name="cross" style={{ color: 'red' }} />
                    </TouchableOpacity>
                </Right>
            </ListItem>
        ))
    }

    render() {

        return (
            <Subscribe to={[StateContainer]}>
                {
                    (profile) => (
                        <View>
                            <Form style={{paddingHorizontal: 5}}>
                                <Item>
                                    <Input value={this.state.quote} placeholder="Add a quote" onChangeText={(text) => this.setState({quote: text})} />
                                    <TouchableOpacity onPress={() => {
                                        this.setState({quote: ""})
                                        profile.addQuote(this.state.quote)}
                                        }>
                                        <Icon type="Entypo" name="plus" style={{ color: 'green' }} />
                                    </TouchableOpacity>
                                </Item>
                            </Form>
                            <List>
                                {this.handleQuoteList(profile.state.quotes, profile.removeQuote)}
                            </List>
                        </View>

                    )
                }
            </Subscribe>

        )
    }
}