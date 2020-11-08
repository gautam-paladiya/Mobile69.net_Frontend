set -f
string=$SERVER_IP
array=(${string//,/})

for i in "${!array[@]}"; do
    echo "deploy project on server ${array[i]}"
    ssh ec2-user@${array[i]} "pm2 stop all && cd /home/ubuntu/mobile69.net && git pull && npm install && npm run build && pm2 restart all"
done