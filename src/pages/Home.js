import React, { useEffect, lazy, Suspense } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import { useChatContext } from "../contexts/ChatContext";

// Imports
import UIWrapper from "../components/UIWrapper";
import UserSearch from "../components/UserSearch";
import Spinner from "../components/Spinner";
import ChatPanel from "../components/ChatPanel";

const UserCard = lazy(() => import("../components/UserCard"));

const Home = () => {
  const { userData } = useAuthContext();
  const { searchResults, isSearchResults } = useUserContext();
  const { userToChat, getChatUsers, chatHistory, panelSwitch } =
    useChatContext();

  useEffect(() => {
    if (userData?._id) {
      getChatUsers(userData._id);
    }
  }, [userData?._id, getChatUsers]);

  return (
    <UIWrapper>
      <div className="w-full h-full hidden lg:flex justify-between items-start">
        <div className="w-full lg:w-1/3 h-full flex flex-col p-[1%] space-y-[3%]">
          <span className="font-semibold text-xl text-textColor">Chats</span>
          <UserSearch />
          {isSearchResults ? (
            <Suspense fallback={<Spinner />}>
              <div className="w-full h-full flex flex-col space-y-[1%] overflow-scroll scrollbar-hide">
                {searchResults?.map((user, index) => (
                  <UserCard data={user} key={index} />
                ))}
              </div>
            </Suspense>
          ) : (
            <Suspense fallback={<Spinner />}>
              <div className="w-full h-full flex flex-col space-y-[1%] overflow-scroll scrollbar-hide">
                {chatHistory?.map((user, index) => (
                  <UserCard data={user} key={index} />
                ))}
              </div>
            </Suspense>
          )}
        </div>
        {userToChat ? (
          <div className="w-full lg:w-2/3 h-full border-s border-inputBorder">
            <ChatPanel />
          </div>
        ) : (
          <div className="w-full lg:w-2/3 h-full border-s border-inputBorder flex justify-center items-center">
            <p className="font-inter font-semibold text-xl text-gray-300">
              Select any user to start chatting
            </p>
          </div>
        )}
      </div>

      <div className="w-full h-full flex flex-col lg:hidden">
        {panelSwitch ? (
          <div className="w-full h-full border-s border-inputBorder">
            <ChatPanel />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col p-[2%] space-y-[3%]">
            <span className="font-semibold text-xl text-textColor">Chats</span>
            <UserSearch />
            {isSearchResults ? (
              <Suspense fallback={<Spinner />}>
                <div className="w-full h-full flex flex-col space-y-[1%] overflow-scroll scrollbar-hide">
                  {searchResults?.map((user, index) => (
                    <UserCard data={user} key={index} />
                  ))}
                </div>
              </Suspense>
            ) : (
              <Suspense fallback={<Spinner />}>
                <div className="w-full h-full flex flex-col space-y-[1%] overflow-scroll scrollbar-hide">
                  {chatHistory?.map((user, index) => (
                    <UserCard data={user} key={index} />
                  ))}
                </div>
              </Suspense>
            )}
          </div>
        )}
      </div>
    </UIWrapper>
  );
};

export default Home;
