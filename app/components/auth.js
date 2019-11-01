import React from 'react';
import { TouchableOpacity, KeyboardAvoidingView, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, database, auth, storage } from '../../config/config';
import { TextInput, Button, Colors, Card, Title } from 'react-native-paper';
import Icon from "react-native-vector-icons";

class UserAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authStep: 0,
            email: '',
            pass: '',
            moveScreen: false
        }
    }

    login = async () => {
        var email = this.state.email;
        var pass = this.state.pass;
        if (email != '' && pass != '') {
            try {
                let user = await auth.signInWithEmailAndPassword(email, pass);
            } catch (error) {
                alert(error);
            }
        } else {
            alert('Email or Password is empty...');
        }
    }

    createUserObj = (userObj, email, name, username) => {
        var uObj = {
            name: name,
            username: "@" + username,
            avatar: 'http://www.gravatar.com/avatar',
            email: email,
        };
        database.ref('users').child(userObj.uid).set(uObj);
    }

    signUp = async () => {
        var email = this.state.email;
        var pass = this.state.pass;
        var username = this.state.username;
        var name = this.state.name;

        if (email != '' && pass != '') {
            try {
                let user = await auth.createUserWithEmailAndPassword(email, pass)
                    .then((userObj) => this.createUserObj(userObj.user, email, name, username))
                    .catch((error) => alert(error));

            } catch (error) {
                alert(error);
            }
        } else {
            alert('Email or Password is empty...');
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                {this.state.authStep == 0 ? (
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Image 
                        style={{width: 425, height: '70%', marginTop: 0}}
                        source={{uri: 'https://st4.depositphotos.com/6469658/23190/v/600/depositphotos_231906840-stock-video-flat-animated-mountain-landscape-background.jpg'}}/>
                        <Button
                        color='green'
                        style={{marginTop: 40, width: 300}}
                        mode='contained'
                        onPress={() => this.setState({authStep: 1})}>Sign in</Button>
                        <Button
                        color='blue'
                        style={{marginVertical: 20, width: 300}}
                        mode='contained'
                        onPress={() => this.setState({authStep: 2})}>Sign Up</Button>
                        <Text style={{marginTop: 20, fontWeight: 'bold'}}>You are not logged in</Text>
                        <Text style={{marginBottom: 20, fontWeight: 'bold'}}>{this.props.message}</Text>
                    </View>
                ) : (
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginVertical: 20}}>
                            {this.state.authStep == 1 ? (
                                //login
                                <View>
                                    <Button
                                    style={{ borderBottomWidth: 2, marginBottom: 10, borderBottomColor: 'black' }}
                                    onPress={() => this.setState({ authStep: 0 })}
                                    mode='text'
                                    icon="arrow-left-bold"
                                    color='black'
                                    uppercase={false}
                                    >Cancel</Button>
                                    <TextInput
                                        label={'Email Address'}
                                        mode={'outlined'}
                                        underlineColor={'green'}
                                        keyboardType={'email-address'}
                                        placeholder={'Enter your email address...'}
                                        onChangeText={(text) => this.setState({ email: text })}
                                        value={this.state.email}
                                        style={{ width: 275, paddingBottom: 10}}
                                    />
                                    <TextInput
                                        label={'Password'}
                                        mode={'outlined'}
                                        secureTextEntry={true}
                                        keyboardType={'email-address'}
                                        placeholder={'Enter your password...'}
                                        onChangeText={(text) => this.setState({ pass: text })}
                                        value={this.state.pass}
                                        style={{ width: 275, paddingBottom: 10}}
                                    />
                                    <Button
                                        uppercase='false'
                                        color='green'
                                        mode='contained'
                                        onPress={() => this.login()}>
                                        Sign In
                                    </Button>
                                </View>
                            ) : (
                                    //sign up
                                    <View>
                                        <Button
                                        style={{ borderBottomWidth: 2, marginBottom: 10, borderBottomColor: 'black' }}
                                        onPress={() => this.setState({ authStep: 0 })}
                                        mode='text'
                                        icon="arrow-left-bold"
                                        color='black'
                                        uppercase={false}
                                        >Cancel</Button>
                    
                                        <TextInput
                                            label={'Name'}
                                            editable={true}
                                            mode={'outlined'}
                                            keyboardType={'email-address'}
                                            placeholder={'Enter your name'}
                                            onChangeText={(text) => this.setState({ name: text })}
                                            value={this.state.name}
                                            style={{ width: 275, paddingBottom: 10}}
                                        />
                                        
                                        <TextInput
                                            label={'Username'}
                                            editable={true}
                                            mode={'outlined'}
                                            keyboardType={'email-address'}
                                            placeholder={'Enter your username'}
                                            onChangeText={(text) => this.setState({ username: text })}
                                            value={this.state.username}
                                            style={{ width: 275, paddingBottom: 10}}
                                        />
                                       
                                        <TextInput
                                            label={'Email Address'}
                                            editable={true}
                                            mode={'outlined'}
                                            keyboardType={'email-address'}
                                            placeholder={'Enter your email adress...'}
                                            onChangeText={(text) => this.setState({ email: text })}
                                            value={this.state.email}
                                            style={{ width: 275, paddingBottom: 10}}
                                        />
                                        <TextInput
                                            label={'Password'}
                                            editable={true}
                                            mode={'outlined'}
                                            secureTextEntry={true}
                                            placeholder={'Enter your email adress...'}
                                            onChangeText={(text) => this.setState({ pass: text })}
                                            value={this.state.pass}
                                            style={{ width: 275, paddingBottom: 10}}
                                        />
                                        <Button
                                            uppercase='false'
                                            color='blue'
                                            mode='contained'
                                            onPress={() => this.signUp()}>
                                            Sign Up
                                    </Button>
                                    </View>
                                )}

                        </View>
                    )}
            </View>
        );
    }
}

export default UserAuth;