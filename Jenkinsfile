properties([disableConcurrentBuilds(), [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '10', numToKeepStr: '20']]])
node ('DATAVIZ-BDXBLD009') {
    String notifChannelSlack = env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'release' ? ' (@channel)' : '';
    String slackChannel = '#watchmen'

    try {
        wrap([$class: 'AnsiColorBuildWrapper', colorMapName: 'xterm']){
            String gitUrl = 'https://github.com/d-theo/watchmen.git'
            stage ('Sources'){
                slackSend channel: slackChannel, message: "WATCHER - Build Started : ${env.JOB_NAME}\nBranch : ${env.BRANCH_NAME} (<${env.BUILD_URL}|Open>)"
                dir ('build'){
                    deleteDir()
                }
                git branch: "${env.BRANCH_NAME}", credentialsId: '7bc32aa3-2c7d-44d1-8689-a1f2131e22ff', url: gitUrl
            }
            String gitAuthor = bat(returnStdout: true, script: "@git --no-pager log -1 --pretty=format:'%%an'").trim()
            //String gitAuthor = sh(returnStdout: true, script: 'git --no-pager log -1 --pretty=format:"%an"').trim()//LINUX
            echo "Last commiter : ${gitAuthor}"
            if(gitAuthor == "'jenkins'"){
                echo "Ignoring jenkins commit ! Bye, baby."
            } else {
                stage ('\u2728 Resolving dependencies (npm)'){
                    bat "npm install"
                }

                stage ('Building'){
                    bat 'npm run build'
                }
                try{
                    def hashversion = readFile "dist/app/version.txt"
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-buba-dataviz', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        //bat("aws s3 cp changelog/CHANGELOG.md s3://dataviz.intraxiti.com/pegasus/changelog/CHANGELOG.md --region eu-west-1  ")
                        bat("aws s3 cp dist/app/changelog.html s3://dataviz.intraxiti.com/pegasus/changelog/index.html --region eu-west-1  ")
                        bat("aws s3 cp dist/app/changelog.html s3://dataviz.intraxiti.com/pegasus/changelog/${hashversion}/changelog.html --region eu-west-1  ")
                    }
                }catch(error){}

                stage ('Packaging'){
                    def hashversion = readFile "dist/app/version.txt"
                    bat "echo ${env.BRANCH_NAME}/${env.BUILD_NUMBER} > dist/app/build.txt"
                    bat 'node ./node_modules/grunt-cli/bin/grunt pack'
                    //On archive si on veut pouvoir redéployer un build spécifique
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-mgmt-artifacts-writer', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        bat("aws s3 cp deploy/ s3://buildartifacts-atinternet/Internal/DataViz/Pegasus/${hashversion}/Binary/ --region eu-west-1 --recursive")
                        bat("aws s3 cp dist/app/changelog.html s3://buildartifacts-atinternet/Internal/DataViz/Pegasus/${hashversion}/Changelog/changelog.html --region eu-west-1 ")
                    }
                }

                stage('Deploying'){
                    def hashversion = readFile "dist/app/version.txt"
                    def version = hashversion.split('-')[0]
                    def hash = hashversion.split('-')[1]

                    switch(env.BRANCH_NAME){
                        case "dev":build job: 'Archis/front-s3-deployer-pipeline',
                            parameters: [
                                string(name: 'SourcePackagePath', value: "Internal/DataViz/Pegasus/${hashversion}/Binary/"),
                                string(name: 'SourcePackageName', value: "pegasus.zip"),
                                string(name: 'DestinationBucket', value: 'userinsights-dev.atinternet-solutions.com'),
                                string(name: 'DestinationPath', value: ''),
                                string(name: 'SlackReportChannel', value: '#dataviz_builds'),
                                string(name: 'CloudFrontDistribution', value: 'E2V0WUWPYUQ1IC'),
                                string(name: 'changelogUrl', value: 'http://userinsights-dev.atinternet-solutions.com.s3-website-eu-west-1.amazonaws.com/changelog.html')


                            ]
                            break
                        case "release":
                        build job: 'Archis/front-s3-deployer-pipeline',
                            parameters: [
                                string(name: 'SourcePackagePath', value: "Internal/DataViz/Pegasus/${hashversion}/Binary/"),
                                string(name: 'SourcePackageName', value: "pegasus.zip"),
                                string(name: 'DestinationBucket', value: 'userinsights-preprod.atinternet-solutions.com'),
                                string(name: 'DestinationPath', value: ''),
                                string(name: 'CloudFrontDistribution', value: 'EHTBM99MOPG9H'),
                                //string(name: 'DestinationBranch', value: "release"),
                                string(name: 'SlackReportChannel', value: '#dataviz_builds'),
                                //string(name: 'gitCommit', value: "${hash}"),
                                //string(name: 'gitRepo', value: "${gitUrl}"),
                                string(name: 'changelogUrl', value: 'http://userinsights-preprod.atinternet-solutions.com.s3-website-eu-west-1.amazonaws.com/changelog.html')

                            ]
                            break

                        case "master":
                            build job: 'Archis/front-s3-deployer-pipeline',
                            parameters: [
                                string(name: 'SourcePackagePath', value: "Internal/DataViz/Pegasus/${hashversion}/Binary/"),
                                string(name: 'SourcePackageName', value: "pegasus.zip"),
                                string(name: 'DestinationBucket', value: 'userinsights.atinternet-solutions.com'),
                                string(name: 'DestinationPath', value: ''),
                                string(name: 'CloudFrontDistribution', value: 'EWAFOFMFKSFAY'),
                                string(name: 'SlackReportChannel', value: '#dataviz_builds'),
                                //string(name: 'DestinationBranch', value: "master")
                                string(name: 'gitTag', value: "${version}"),
                                //string(name: 'gitCommit', value: "${hash}"),
                                string(name: 'gitRepo', value: "${gitUrl}"),
                                string(name: 'changelogUrl', value: 'http://userinsights.atinternet-solutions.com.s3-website-eu-west-1.amazonaws.com/changelog.html')

                            ]
                            break
                        default:
                            build job: 'Archis/front-s3-deployer-pipeline',
                                parameters: [
                                    string(name: 'SourcePackagePath', value: "Internal/DataViz/Pegasus/${hashversion}/Binary/"),
                                    string(name: 'SourcePackageName', value: "pegasus.zip"),
                                    string(name: 'DestinationBucket', value: 'userinsights-branches.atinternet-solutions.com'),
                                    string(name: 'DestinationPath', value: env.BRANCH_NAME),
                                    string(name: 'SlackReportChannel', value: ''),
                                    string(name: 'CloudFrontDistribution', value: 'E1F5EFJFS2BN2Y'),
                                    string(name: 'changelogUrl', value: "http://userinsights-branches.atinternet-solutions.com.s3-website-eu-west-1.amazonaws.com/${env.BRANCH_NAME}/changelog.html")
                                ]
                            break

                    }
                }
                if(manager.logContains(".*SOME TESTS ARE IGNORED.*"))
                {
                    echo 'Tests are ignored, make build unstable'
                    manager.buildUnstable()
                }
                //slackSend channel: "#dataviz_builds", message: "PEGASUS - Build Done : ${env.JOB_NAME}\nBranch : ${env.BRANCH_NAME}\nDuration : " + manager.build.durationString + " (<${env.BUILD_URL}|Open>)"
            }
        }
    } catch(err) {
        slackSend channel: slackChannel, message: "WATCHER - Deployment ERROR ${notifChannelSlack} : ${env.JOB_NAME}\nBranch : ${env.BRANCH_NAME}\nError : " + err + " (<${env.BUILD_URL}|Open>)", color:'danger'
        throw err
    }
}
