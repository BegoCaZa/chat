import { useEffect, useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { io } from 'socket.io-client';
import ChatContainer from './components/chatContainer/ChatContainer';

const App = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [messages, setMessages] = useState([]); //aqui se guardan los mensajes
	const [newMessage, setNewMessage] = useState(''); //aqui se guarda el mensaje que se escribe
	const [userName, setUserName] = useState(''); //aqui se guarda el nombre de usuario
	const [userCount, setUserCount] = useState(0); //aqui se guarda el contador de usuarios
	const socket = io('http://localhost:3000');

	useEffect(() => {
		socket.on('connect', () => {
			setIsConnected(true);
		});
		socket.on('user_assigned', data => {
			setUserName(data.userName); //asigna el nombre de usuario al estado
			setUserCount(data.userCount); //asigna el contador de usuarios al estado
		});
		socket.on('chat_message', data => {
			setMessages(messages => [...messages, data]); //actualiza el estado de los mensajes con el nuevo mensaje recibido
		});
	}, []);

	const sendMessage = () => {
		// funciona como eventos: se le da nombre al evento y se le pasa un objeto con los datos
		socket.emit('chat_message', {
			user: userName, //nombre de usuario
			message: newMessage
		});

		//reiniciar
		return () => {
			socket.off('connect');
			socket.off('chat_message');
		};
	};

	return (
		<>
			<GlobalStyles />
			<h1>{isConnected ? 'ONLINE' : 'OFFLINE'} </h1>
			<h3>Users conected: {userCount}</h3>
			<ChatContainer
				setNewMessage={setNewMessage}
				sendMessage={sendMessage}
				messages={messages}
			/>
		</>
	);
};

export default App;
