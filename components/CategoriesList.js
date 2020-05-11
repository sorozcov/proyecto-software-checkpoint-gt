// import React, { useEffect, Fragment } from 'react';
// import { connect } from 'react-redux';
// import { Container, Content, Header, List } from 'native-base';
// import { Dimensions } from "react-native";

// import CategoryRow from './CategoryRow';
// import * as actions from '../src/actions/categories';
// import * as selectors from '../src/reducers';

// const width = Dimensions.get('window').width; // full width

// function UserList ({ onLoad, categories, isLoading }) {
//     useEffect(onLoad, []);

//     return(
//         <Fragment>
//             {
//                 isLoading && (
//                     <Text>Cargando...</Text>
//                 )
//             }
//             {
//                 categories.length < 0 && !isLoading && (
//                     <View>No hay usuarios registrados</View>
//                 )
//             }
//             {
//                 categories.length > 0 && !isLoading && (
//                     <Container width={width}>
//                         <Header/>
//                         <Content>
//                             <List>
//                                 {
//                                     categories.map(({ name }) => <CategoryRow name={`${name}`}/>)
//                                 }
//                             </List>
//                         </Content>
//                     </Container>
//                 )
//             }
//         </Fragment>
//     )
// };

// export default connect(
//     state => ({
//         categories: selectors.getCategories(state),
//         isLoading: selectors.isFetchingCategories(state),
//     }),
//     dispatch => ({
//         onLoad() {
//             dispatch(actions.startFetchingCategories());
//         },
//     }),
// )(UserList)