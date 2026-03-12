class ChatChannel < ApplicationCable::Channel
  def subscribed          # クライアントが接続してきたとき
    stream_from "chat_room"   # "chat_room" というストリームを監視し始める
  end

  #             クライアント側                           サーバー側
  # receive	    chatChannel.send(data)                 def receive(data) が自動で呼ばれる
  # 任意メソッド  chatChannel.perform("メソッド名", data)  対応するメソッドが呼ばれる
  def receive(data)       # クライアントからメッセージが届いたとき
    ActionCable.server.broadcast("chat_room", data)  # 全員に配信する
  end


  def unsubscribed; end          # クライアントが接続を解除したとき
end
