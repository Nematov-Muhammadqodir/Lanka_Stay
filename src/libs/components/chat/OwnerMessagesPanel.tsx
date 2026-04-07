import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Image from "next/image";
import { useLazyQuery, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import {
  GET_MY_CONVERSATIONS,
  GET_CONVERSATION_MESSAGES,
} from "@/apollo/user/query";
import { SEND_MESSAGE } from "@/apollo/user/mutation";
import { partnerVar } from "@/apollo/store";
import { useTranslation } from "next-i18next";

const OwnerMessagesPanel = () => {
  const { t } = useTranslation("common");
  const partner = useReactiveVar(partnerVar);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: convData, refetch: refetchConvs } = useQuery(
    GET_MY_CONVERSATIONS,
    { pollInterval: 3000 }
  );
  const conversations = convData?.getMyConversations ?? [];

  const [getMessages] = useLazyQuery(GET_CONVERSATION_MESSAGES, {
    fetchPolicy: "network-only",
  });
  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Poll messages for selected conversation
  useEffect(() => {
    if (!selectedConv) return;
    const fetchMsgs = async () => {
      const { data } = await getMessages({
        variables: { conversationId: selectedConv._id },
      });
      if (data) setMessages(data.getConversationMessages);
    };
    fetchMsgs();
    const interval = setInterval(fetchMsgs, 3000);
    return () => clearInterval(interval);
  }, [selectedConv]);

  const handleSelectConv = async (conv: any) => {
    setSelectedConv(conv);
    const { data } = await getMessages({
      variables: { conversationId: conv._id },
    });
    if (data) setMessages(data.getConversationMessages);
    // Refetch to update unread counts
    setTimeout(() => refetchConvs(), 500);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedConv) return;

    const otherParticipantId = selectedConv.participantIds.find(
      (id: string) => id !== partner._id
    );

    try {
      const { data } = await sendMessageMutation({
        variables: {
          input: {
            receiverId: otherParticipantId,
            receiverRole: "GUEST",
            messageContent: newMessage,
          },
        },
      });
      if (data?.sendMessage) {
        setMessages((prev) => [...prev, data.sendMessage]);
        setNewMessage("");
        refetchConvs();
      }
    } catch (err: any) {
      console.error("Send error:", err);
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Stack
      direction="row"
      height={550}
      border="1px solid"
      borderColor="divider"
      borderRadius={2}
      overflow="hidden"
    >
      {/* Conversation List */}
      <Stack
        width={320}
        minWidth={320}
        borderRight="1px solid"
        borderColor="divider"
      >
        <Stack
          px={2}
          py={1.5}
          borderBottom="1px solid"
          borderColor="divider"
        >
          <Typography fontWeight={700} fontSize={16}>
            {t("chat.messages")} ({conversations.length})
          </Typography>
        </Stack>
        <Stack sx={{ overflowY: "auto", flex: 1 }}>
          {conversations.length === 0 ? (
            <Stack alignItems="center" justifyContent="center" flex={1} py={6}>
              <ChatBubbleOutlineIcon
                sx={{ fontSize: 40, color: "text.disabled", mb: 1 }}
              />
              <Typography color="text.secondary" fontSize={14}>
                {t("chat.noMessages")}
              </Typography>
            </Stack>
          ) : (
            conversations.map((conv: any) => (
              <Stack
                key={conv._id}
                direction="row"
                gap={1.5}
                px={2}
                py={1.5}
                onClick={() => handleSelectConv(conv)}
                sx={{
                  cursor: "pointer",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  backgroundColor:
                    selectedConv?._id === conv._id
                      ? "action.selected"
                      : "transparent",
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <Image
                  src={
                    conv.otherParticipantImage
                      ? `${process.env.NEXT_PUBLIC_API_URL}/${conv.otherParticipantImage}`
                      : "/img/logo/uniface.jpg"
                  }
                  alt="avatar"
                  width={42}
                  height={42}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <Stack flex={1} overflow="hidden">
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={600} fontSize={14} noWrap>
                      {conv.otherParticipantName}
                    </Typography>
                    <Typography fontSize={11} color="text.disabled" flexShrink={0}>
                      {timeAgo(conv.lastMessageAt)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      fontSize={12}
                      color="text.secondary"
                      noWrap
                      flex={1}
                    >
                      {conv.lastMessage}
                    </Typography>
                    {conv.unreadCount > 0 && (
                      <Box
                        sx={{
                          ml: 1,
                          minWidth: 22,
                          height: 22,
                          borderRadius: "50%",
                          backgroundColor: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Typography fontSize={11} fontWeight={700} color="white">
                          {conv.unreadCount}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            ))
          )}
        </Stack>
      </Stack>

      {/* Chat Area */}
      {selectedConv ? (
        <Stack flex={1}>
          {/* Chat Header */}
          <Stack
            direction="row"
            alignItems="center"
            gap={1.5}
            px={2}
            py={1.5}
            borderBottom="1px solid"
            borderColor="divider"
          >
            <IconButton
              size="small"
              onClick={() => setSelectedConv(null)}
              sx={{ display: { md: "none" } }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Image
              src={
                selectedConv.otherParticipantImage
                  ? `${process.env.NEXT_PUBLIC_API_URL}/${selectedConv.otherParticipantImage}`
                  : "/img/logo/uniface.jpg"
              }
              alt="avatar"
              width={36}
              height={36}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <Typography fontWeight={700} fontSize={15}>
              {selectedConv.otherParticipantName}
            </Typography>
          </Stack>

          {/* Messages */}
          <Stack
            flex={1}
            px={2}
            py={1.5}
            gap={1}
            sx={{
              overflowY: "auto",
              backgroundColor: "background.default",
            }}
          >
            {messages.map((msg: any) => {
              const isMe = msg.senderId === partner._id;
              return (
                <Stack
                  key={msg._id}
                  alignItems={isMe ? "flex-end" : "flex-start"}
                >
                  <Box
                    sx={{
                      maxWidth: "75%",
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: isMe
                        ? "primary.main"
                        : "background.paper",
                      color: isMe ? "white" : "text.primary",
                      border: isMe ? "none" : "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography fontSize={13} lineHeight={1.4}>
                      {msg.messageContent}
                    </Typography>
                  </Box>
                  <Typography
                    fontSize={10}
                    color="text.disabled"
                    mt={0.3}
                    px={0.5}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Stack>
              );
            })}
            <div ref={messagesEndRef} />
          </Stack>

          {/* Input */}
          <Stack
            direction="row"
            gap={1}
            px={1.5}
            py={1}
            alignItems="center"
            borderTop="1px solid"
            borderColor="divider"
          >
            <TextField
              placeholder={t("chat.typeMessage")}
              size="small"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 5 },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <Stack
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <ChatBubbleOutlineIcon
            sx={{ fontSize: 50, color: "text.disabled", mb: 1 }}
          />
          <Typography color="text.secondary">
            {t("chat.selectConversation")}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default OwnerMessagesPanel;
