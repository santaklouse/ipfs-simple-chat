<template>
    <div>
        <div class="form-group">
            <label for="roomName">Please enter The Room identifier:</label>
            <input id="roomName" v-model="roomName"/>
            <button type="submit" @click="initiateRoomConnection">Connect</button>
        </div>
        <textarea v-model="$data._log"></textarea>
    </div>

</template>

<script>
    import PubSubRoom from 'ipfs-pubsub-room'
    import isIPFS from 'is-ipfs'
    export default {
        name: "IpfsRoom",
        data: () => ({
            roomName: "room-name",
            _log: ''
        }),
        mounted: async function () {
        },
        methods: {
            log(message, peer = null) {
                if (!peer) {
                    this.$data._log += message + "\r\n";
                    return;
                }
                this.$data._log += `${peer}: ${message}\r\n`;
            },
            async initiateRoomConnection() {
                const room = PubSubRoom(await this.$ipfs, this.roomName);

                room.on('peer joined', (peer) => {
                    this.log('joined the room', peer)
                })

                room.on('peer left', (peer) => {
                    this.log('left...', peer)
                })

                // now started to listen to room
                room.on('subscribed', () => {
                    this.log('Listening Room!')
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    textarea {
        width: 30%;
    }
</style>
