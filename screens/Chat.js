import React, {
    useState,
    useLayoutEffect,
    useEffect
  } from 'react';
  import { TouchableOpacity, Modal, Button, Alert, View } from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    deleteDoc,
    orderBy,
    query,
    onSnapshot,
    getDocs,
    doc,
    updateDoc,
    where
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import { auth, database } from '../config/firebase';
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import colors from '../colors';
import ImageViewer from 'react-native-image-zoom-viewer';
import Spinner from 'react-native-loading-spinner-overlay';


function getNRandomItems(array, n) {
  // Check if n is greater than the array length
  if (n > array.length) {
      console.error("Error: Number of items to select is greater than the array length.");
      return;
  }

  // Fisher-Yates (Knuth) Shuffle Algorithm
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }

  // Return the first n items
  return array.slice(0, n);
}

  export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [isMyCardsModalOpen, setIsMyCardsModalOpen] = useState(false);
    const [whiteCards, setWhiteCards] = useState([{}]);
    const [blackCardConfig, setBlackCardConfig] = useState([{}]);
    const [imagesViwerConfig, setImagesViewrConfig] = useState([{}]);
    const [isBlackCardModalOpen, setIsBlackCardModalOpen] = useState(false);
    const [isGameActive, setIsGameActive] = useState(false);
    const [isGameLoading, setIsGameLoading] = useState(false);
    const navigation = useNavigation();

    //refs
    const gameStatusRef = collection(database, 'game_status');
    const activeBlackCardCollectionRef = collection(database, 'active_black_card');
    const blackCardRef = collection(database, 'black_deck');
    const whiteCardsRef = collection(database, 'white_deck');
    const collectionRef = collection(database, 'chats');

    function removeActiveUser(user_id) {
      const q = query(collection(database, 'active_users'), where('user_id', '==', user_id));
      onSnapshot(q, querySnapshot => {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        });
    }

  const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
      removeActiveUser(auth.currentUser.uid);
    };
  const showMyCards = () => {
    setIsMyCardsModalOpen((modalState) => !modalState);
  }

  const showBlackCard = () => {
    setIsBlackCardModalOpen((modalState) => !modalState);
  }

  const handleGetANewBlackCard = () => {
    //remove active black card
    getDocs(activeBlackCardCollectionRef)
      .then((snapshot) => {
        if (snapshot.size === 0) {
          return;
        }

        snapshot.docs.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      })
      .catch((error) => {
        console.error('Erro ao excluir documentos:', error);
      });


    // get all black cards and set a new random active black card

    const qBlack = query(blackCardRef);
    onSnapshot(qBlack, querySnapshot => {
      addDoc(collection(database, 'active_black_card'), {
       image_src: querySnapshot.docs[Math.floor(Math.random() *  querySnapshot.docs.length)].data()?.image_src
      });
    });
  }

  const updateGameStatus = () => {
    getDocs(gameStatusRef)
      .then((snapshot) => {
        if (snapshot.size === 0) {
          console.log('Não há documentos para atualizar.');
          return;
        }
        const gameStatusDoc = snapshot.docs[0];
        const docRef = doc(gameStatusRef, gameStatusDoc.id);
        return updateDoc(docRef, {
          is_active: !(gameStatusDoc.data().is_active),
        });
      })
  }

  const handleGameStart = () => {
    setIsGameLoading(true)
    try {
      updateGameStatus();
      handleGetANewBlackCard();
    } catch (error) {
      Alert.alert('Algo deu errado', error.message);
    } finally {
      setTimeout(() => setIsGameLoading(false), 5000)
    }
  }

  const handleEndGame = () => {
    getDocs(whiteCardsRef)
    .then((snapshot) => {
      if (snapshot.size === 0) {
        console.log('Não há documentos para atualizar.');
        return;
      }
      const wCardsSrcArr = 
      snapshot.docs.map((doc) => ({
        src: doc.data().image_src,
        onHand: doc.data().on_hand,
        trash: doc.data().trash,
        docId: doc.id 
      })).filter((wDoc) => wDoc.onHand === true);
      wCardsSrcArr.forEach((wCDoc) =>  { const docRef = doc(whiteCardsRef, wCDoc.docId);  updateDoc(docRef, {
        on_hand: false,
      });})
    })
    getDocs(collectionRef).then((snapshot) => {
      if (snapshot.size === 0) {
        console.log('Não há documentos para atualizar.');
        return;
      }
      const parsedChats = 
      snapshot.docs.map((doc) => ({
        docId: doc.data()._id,
        image: doc.data().image,
        docRef: doc.ref
      })).filter((cDoc) => cDoc.image);
      console.log(parsedChats)
      parsedChats.forEach((cDoc) =>  { deleteDoc(cDoc.docRef)})
    })
    updateGameStatus();
  }

  useEffect(() => {
    if(isGameActive){
      setWhiteCards([{}]);
    }
  }, [isGameActive]);

  useLayoutEffect(() => {
    const q = query(gameStatusRef);
    const unsubscribeStatus = onSnapshot(q, querySnapshot => {
      setIsGameActive(querySnapshot.docs?.[0]?.data().is_active);
    });
    return unsubscribeStatus;
  }, []);

  useLayoutEffect(() => {
    const q = query(activeBlackCardCollectionRef);
    const unsubscribe = onSnapshot(q, querySnapshot => {
    console.log('querySnapshot unsusbscribe');
    querySnapshot.docChanges().forEach((newDoc) => {
          if (newDoc.type === 'added') {
            setBlackCardConfig([{
              url:  newDoc.doc.data()?.image_src,
              width: 214,
              height: 214,
            }])
          }
        });
    });
    return unsubscribe;
  }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => { if(!isGameActive) return null; 
              return (
                <>
                  <TouchableOpacity
                    style={{
                      marginRight: 10,
                      marginTop: 10
                    }}
                    onPress={handleEndGame}
                  >
                    <AntDesign name="closecircle" size={24} color={colors.gray} style={{marginRight: 10}}/>
                  </TouchableOpacity>
                </>
              )
            }
        });
      }, [navigation, isGameActive]);

    useLayoutEffect(() => {
       
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
              image: doc.data().image
            }))
          );
        });
    return unsubscribe;
      }, []);

    const handleGetWhiteCards = (whiteCardsLength) => {
      setIsGameLoading(true);
      if(whiteCards.length >= 10) return;
      const cardsToDraw = 11 - whiteCardsLength;
      console.log('comprando')
      getDocs(whiteCardsRef)
        .then((snapshot) => {
          const wCardsSrcArr = 
          snapshot.docs.map((doc) => ({
            src: doc.data().image_src,
            onHand: doc.data().on_hand,
            trash: doc.data().trash,
            docId: doc.id
          })).filter((wDoc) => wDoc.onHand === false)
          const randomWhiteCards = getNRandomItems(wCardsSrcArr, cardsToDraw);
          randomWhiteCards.forEach((wCDoc) =>  { const docRef = doc(whiteCardsRef, wCDoc.docId);  updateDoc(docRef, {
            on_hand: true,
          });})
          setWhiteCards((oldCards) => [...randomWhiteCards, ...oldCards]);
        })
        setTimeout(() => setIsGameLoading(false), 5000)
    }

  

    useEffect(() => {
      setImagesViewrConfig( whiteCards.map((wCard) =>  ( {url: wCard.src,
        width: 214,
        height: 214,})))
    }, [whiteCards.length])

    const onSend = (messages = []) => {
      if(messages[0]?.image){
        const newWhiteCards = whiteCards.filter((wCard) => wCard.src !== messages[0]?.image);
        setWhiteCards(newWhiteCards);
      }
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(database, 'chats'), {
          _id,
          createdAt,
          text,
          user,
          image: messages[0]?.image || ''
        });
      };
    
      const generateId = () => {
        return Math.floor(Math.random() * 1000000) + new Date().getTime();
      };
  
      return (
        <>
          <Spinner
          visible={isGameLoading}
          textContent={'Carregando'}
        />
        <Modal
          visible={isMyCardsModalOpen}
          transparent={true}
          onRequestClose={() => setIsMyCardsModalOpen(false)}
        >
          <ImageViewer footerContainerStyle={{width: '100%'}} renderFooter={(currentI) => <View style={ {display: 'flex',
          width: 'auto',
          flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10}}><Button title='Selecionar' onPress={() => {onSend([{ user:{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }, _id:generateId(), text: '', createdAt: new Date(), image: whiteCards[currentI].src }])}} /><Button disabled={isGameLoading}  title='Mais cartas' onPress={() => handleGetWhiteCards(whiteCards.length)} /></View>} onCancel={() => setIsMyCardsModalOpen(false)} swipeDownThreshold={10} enableSwipeDown={true} imageUrls={imagesViwerConfig} />
        </Modal>

        <Modal
          visible={isBlackCardModalOpen}
          transparent={true}
          onRequestClose={() => setIsBlackCardModalOpen(false)}
        >
          <ImageViewer renderFooter={() =>(<Button title='Nova Carta' onPress={handleGetANewBlackCard} />)} onCancel={() => setIsBlackCardModalOpen(false)} swipeDownThreshold={10} enableSwipeDown={true} imageUrls={blackCardConfig} />
        </Modal>
        {isGameActive && (
        <Button
        color='black'
        title="Carta Preta"
        onPress={showBlackCard}
      />
        )}
        <GiftedChat
          imageStyle={{ objectFit: 'contain' }}
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
        {isGameActive && (
          <Button
          title="Minhas cartas"
          onPress={showMyCards}
        />
        )}

{!isGameActive && (
  <Button
  color='green'
  title="Jogar"
  onPress={handleGameStart}
/>
)}
   
         </>
      );


}

