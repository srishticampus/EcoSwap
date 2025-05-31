import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserNavbar from './UserNav'

function UserChat({ url }) {
    const [productList, setProductList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedProductSender, setSelectedProductSender] = useState(null)
    const [messages, setMessages] = useState([])
    const [senders, setSenders] = useState([])
    const [sendersDetails, setsendersDetails] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [conversations, setConversations] = useState([]) // For owners: users who messaged
    const [isOwner, setIsOwner] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null) // Currently selected user in owner view

    const userId = localStorage.getItem("userid")

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${url}/product/all`)
                if (res.data.success) {
                    const all = res.data.data
                    console.log(all)
                    // Products user doesn't own (for buyer chat)
                    const filtered = all.filter(
                        (product) =>
                            product.addedBy._id !== userId &&
                            product.addedByType === 'users' &&
                            product.isAvailable === true
                    )

                    setProductList(filtered)
                    if (filtered.length > 0) {
                        setSelectedProduct(filtered[0])
                        // setReceiverId(filtered[0].addedBy._id)
                        setIsOwner(false)
                        setSelectedUser(null)
                    }

                    // Products user owns (to receive chats)
                    const owned = all.filter(
                        (product) => product.addedBy._id === userId
                    )

                    if (owned.length > 0) {
                        setProductList(prev => [...prev, ...owned])
                    }
                }
            } catch (err) {
                console.error("Error fetching products", err)
            }
        }

        if (userId) {
            fetchProducts()
        }
    }, [userId, url])

    // Detect if current user is product owner
    useEffect(() => {
        if (selectedProduct) {
            const isProductOwner = selectedProduct.addedBy._id === userId
            setIsOwner(isProductOwner)
            setMessages([])
            setSelectedUser(null)
            setSelectedProductSender(null);

            // if (isProductOwner) {
            //     fetchMessages(selectedProduct._id, '')
            //     setReceiverId('') // Clear receiver since owner selects user next
            // } else {
            //     setReceiverId(selectedProduct.addedBy._id)
            //     fetchMessages(selectedProduct._id, selectedProduct.addedBy._id)
            // }
            if (!isProductOwner) {
                setReceiverId(selectedProduct.addedBy._id);
            } else {
                setReceiverId('')
            }
            fetchMessages(selectedProduct._id, selectedProduct.addedBy._id)
        }
    }, [selectedProduct])

    const fetchchat = async (productId) => {
        try {
            const res = await axios.get(`${url}/product-chat`, {
                params: { productId},
            })

            const chat = res.data.chat
            
            console.log(chat)
            if (chat && chat.messages && Array.isArray(chat.messages)) {
                let temp = [];
                for (let i in chat.messages) {
                    let msg = chat.messages[i];
                    if (msg && msg.senderId && (msg.senderId._id == selectedProductSender && msg.receiverId == selectedProduct.addedBy._id) || (msg.senderId._id == selectedProduct.addedBy._id && msg.receiverId == selectedProductSender)) {
                        temp.push({
                            text: msg.message,
                            isMe: msg.senderId._id == userId,
                            timestamp: msg.sentAt,
                        })
                    }
                }
                // const mapped = chat.messages.map((msg) => ({
                //     text: msg.message,
                //     isMe: msg.senderId._id == userId,
                //     timestamp: msg.sentAt,
                // }))
                setMessages(temp)
                // setReceiverId(receiver)
                // setSelectedUser(receiver) // Track selected user in owner chat
            } else {
                setMessages([])
                // setSelectedUser(receiver)
            }
        } catch (err) {
            console.error("Fetch message failed", err)
            setMessages([])
            setSelectedUser(receiver)
        }
    }

    // select chat
    useEffect(() => {
        if (selectedProductSender) {
            fetchchat(selectedProduct._id);
        }
        setReceiverId(selectedProductSender);
    }, [selectedProductSender])

    const fetchConversations = async (productId) => {
        try {
            const res = await axios.get(`${url}/product-chat/conversations`, {
                params: { productId },
            })
            if (res.data.success) {
                setConversations(res.data.users)
                setMessages([])
                setSelectedUser(null)
            }
        } catch (err) {
            console.error("Failed to fetch conversations", err)
        }
    }

    const fetchMessages = async (productId, receiver) => {
        try {
            console.log(senders)
            setSenders([]);
            const res = await axios.get(`${url}/product-chat`, {
                params: { productId, userId1: userId, userId2: receiver },
            })

            const chat = res.data.chat
            let senderArray = [];
            let senderDetailArray = {};
            for (var i in chat.messages) {
                if (chat.messages[i] && chat.messages[i].senderId && !senderArray.includes(chat.messages[i].senderId._id)) {
                    console.log('test')
                    senderArray.push(chat.messages[i].senderId._id);
                    senderDetailArray[chat.messages[i].senderId._id] = chat.messages[i].senderId
                }
            }
            

            if (selectedProduct.addedBy._id == userId) {
                setSenders(senderArray);
            } else {
                console.log(chat)
                setReceiverId(selectedProduct.addedBy._id);
                if (chat && chat.messages && Array.isArray(chat.messages)) {
                    let temp = [];
                    for (let i in chat.messages) {
                        let msg = chat.messages[i];
                        if (msg && msg.senderId && (msg.senderId._id == userId && msg.receiverId == selectedProduct.addedBy._id) || (msg.senderId._id == selectedProduct.addedBy._id && msg.receiverId == userId)) {
                            temp.push({
                                text: msg.message,
                                isMe: msg.senderId._id == userId,
                                timestamp: msg.sentAt,
                            })
                        }
                    }
                    // const mapped = chat.messages.map((msg) => ({
                    //     text: msg.message,
                    //     isMe: msg.senderId._id == userId,
                    //     timestamp: msg.sentAt,
                    // }))
                    setMessages(temp);
                    // setReceiverId(receiver);
                    setSelectedUser(receiver); // Track selected user in owner chat
                } else {
                    setMessages([])
                    setSelectedUser(receiver)
                }
            }
            setsendersDetails(senderDetailArray);
        } catch (err) {
            console.error("Fetch message failed", err)
            setMessages([])
            setSelectedUser(receiver)
        }
    }

    const handleSend = async () => {
        if (!newMessage.trim() || !selectedProduct ) return
        try {
            if (receiverId == userId || !receiverId) {
                return;
            }
            await axios.post(`${url}/send`, {
                productId: selectedProduct._id,
                senderId: userId,
                receiverId: receiverId ? receiverId : '',
                message: newMessage,
            })

            setMessages(prev => [...prev, { text: newMessage, isMe: true, timestamp: new Date().toISOString() }])
            setNewMessage('')
        } catch (err) {
            console.error("Send failed", err)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNavbar />
            <div className="flex flex-col lg:flex-row px-4 py-6">

                {/* Sidebar */}
                <div className="lg:w-1/4 w-full mb-6 lg:mb-0">
                    <h2 className="text-center text-xl font-semibold mb-2 text-gray-700">Products</h2>
                    <ul className="bg-white rounded-lg shadow divide-y">
                        {productList.map(product => (
                            <li
                                key={product._id}
                                onClick={() => setSelectedProduct(product)}
                                className={`px-4 py-3 cursor-pointer hover:bg-green-100 ${selectedProduct?._id === product._id ? 'bg-green-200 font-semibold' : ''
                                    }`}
                            >
                                {product.title || 'Unnamed Product'}
                                <span>
                                    {product && product.addedBy && product.addedBy._id && product.addedBy._id === userId ? ' - my product' : ''}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Owner-specific: show users who messaged */}
                    {isOwner && conversations.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-gray-700 font-medium mb-2">Users Messaged</h3>
                            <ul className="bg-white rounded-lg shadow divide-y">
                                {conversations.map(user => (
                                    <li
                                        key={user._id}
                                        onClick={() => fetchMessages(selectedProduct._id, user._id)}
                                        className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                                            selectedUser === user._id ? 'bg-green-300 font-semibold' : ''
                                        }`}
                                    >
                                        {user.username}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Chat Section */}
                <div className="lg:w-3/4 w-full bg-white rounded-lg shadow flex flex-col h-[75vh]">
                    {/* Header */}
                    <div className="bg-green-600 text-white px-6 py-3 rounded-t-lg">
                        <h3 className="text-lg font-semibold">
                            💬 Chat {isOwner
                                ? `with ${conversations.find(u => u._id === selectedUser)?.username || 'User'}`
                                : "with Product Owner"}
                        </h3>
                    </div>

                    {/* Chat Body */}
                    {/* chat users list */}
                    <ul className="bg-white rounded-lg shadow divide-y">
                        {senders.map(sender => (
                            <li
                                key={sender && sender._id ? sender._id : ''}
                                onClick={() => setSelectedProductSender(sender)}
                                className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                                            sender == selectedProductSender ? 'bg-green-300 font-semibold' : ''
                                        }`}
                            >
                                {'message from - ' + sendersDetails[sender].email}
                            </li>
                        ))}
                    </ul>

                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                        {messages.length === 0 ? (
                            <p className="text-gray-500 text-center">No messages yet.</p>
                        ) : (
                            messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-xs px-4 py-2 rounded-lg text-sm ${msg.isMe ? 'bg-green-500 text-white' : 'bg-blue-100 text-gray-800'
                                        }`}>
                                        <p>{msg.text}</p>
                                        <p className="text-xs text-gray-900 mt-1 text-right">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input */}
                    <div className="flex px-4 py-3 border-t">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            onClick={handleSend}
                            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserChat
