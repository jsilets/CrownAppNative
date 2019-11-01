import React from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, database} from '../../config/config';


class comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            comments: []
        }
    }

    checkParams = () => {
        var params = this.props.navigation.state.params;
        if (params) {
            if (params.photoId) {
                this.setState({
                    photoId: params.photoId
                });
                this.fetchComments(params.photoId);
            }
        }
    }

    addCommentsToList = (comments_list, data, comment) => {
        that = this;
        var commentObj = data[comment];
        database.ref('users').child(commentObj.author).child('username').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null)
            if(exists) data = snapshot.val();
                comments_list.push({
                    id: comment,
                    comment: commentObj,
                    posted: that.timeConverter(commentObj.posted),
                    author: data,
                    authorId: commentObj.author
                });

                that.setState({
                    refresh: false,
                    loading: false
                });
        }).catch(error => console.log(error));
    }

    fetchComments = () => {
        //fetch comments
        var that = this;
        database.ref('comments').child(photoId).orderByChild('posted').once(value).then(function (snapshot) {
            const exists = (snapshot.val() !== null)
            if (exists) {
                data = snapshot.val();
                var comments_list = that.state.comments_list;
                console.log(comments_list);

                for(var comment in data){
                    that.addCommentsToList(comments_list, data, comment);
                }
            } else {
                that.setState({comments_list: []});
            }
        }).catch(error => console.log(error));
    }

    pluralCheck = (s) => {
        if (s == 1) {
            return ' ago';
        } else {
            return 's ago'
        }
    }

    timeConverter = (timestamp) => {
        var a = new Date(timestamp * 1000);
        var seconds = Math.floor((new Date() - a) / 1000);

        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + ' year' + this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' month' + this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' day' + this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' hour' + this.pluralCheck(interval);
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' minute' + this.pluralCheck(interval);
        } else {
            return Math.floor(seconds) + ' second' + this.pluralCheck(interval);
        }
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    uniqueId = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }

    componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                that.setState({
                    loggedin: true
                });
            } else {
                that.setState({
                    loggedin: false
                })
            }
        });
        this.checkParams();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: .5, justifyContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: 100 }} onPress={() => this.props.navigation.goBack()}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 10 }}>Go Back</Text>
                    </TouchableOpacity>
                    <Text>Comments</Text>
                    <Text style={{ width: 100 }}></Text>
                </View>
                {this.state.comments_list.length == 0 ? (
                    //no comments show empty state
                    <Text>No comments to show...</Text>
                ) : (
                        //are comments
                        <FlatList
                            refreshing={this.state.refresh}
                            data={this.state.comments_list}
                            keyExtractor={(item, inndex) => index.toString()}
                            style={{ flex: 1, backgroundColor: '#eee' }}
                            renderItem={(item, index) => (
                                <View key={index} style={{ width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey' }}>
                                    <View>
                                        <Text>{item.posted}</Text>
                                        <TouchableOpacity>
                                            <Text>{item.author}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text>{item.comment}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    )
                }
                {this.state.loggedin == true ? (
                    <Text>Commentsss</Text>
                ) : (
                        <View>
                            <Text>You are not logged in</Text>
                            <Text>Please log in to post a comment</Text>
                        </View>
                    )}
            </View>
        );
    }
}

export default comment;