// COULD NOT USE BECAUSE OF WINDOWS OS


pipeline {
    agent any
    environment{
        SERVER_PID = ''
    }
    stages{
        stage ("Install dependencies"){
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage ('Run Server') {
            steps {
                script {
                    echo 'Starting server in background or in detach mode...'
                    def serverProcess = sh(script: 'node server.js & echo $!', returnStdout: true).trim()
                    
                    // store process id for killing it
                    env.SERVER_PID = serverProcess
                    echo 'Server is running with PID ${env.SERVER_PID}'

                    // ensuring server is properly started before proceeding
                    sleep 5
                }
            }
        }
        stage ('Integration test') {
            steps {
                script {
                    // Run the Postman tests using Newman
                    echo 'Running integration tests with Newman...'
                    def newmanOutput = sh(script: 'newman run simple-api-tests.json', returnStdout: true).trim()
                    echo "Newman Test Output: ${newmanOutput}"
                }
            }
        }
        stage ('Stop running server'){
            steps{
                script{
                    // Kill the server using the stored process ID
                    echo "Stopping server with PID: ${env.SERVER_PID}"
                    sh "kill ${env.SERVER_PID}"
                }
            }
        }
    }
}