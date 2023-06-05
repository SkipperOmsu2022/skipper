mvn clean package
echo "compile"
sftp algeps@158.160.8.145
put .\backend\target\backend-1.0-SNAPSHOT.jar
exit
echo "send"
ssh algeps@158.160.8.145
java -jar backend-1.0-SNAPSHOT.jar
echo "run"