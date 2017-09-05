#!/usr/bin/groovy
@Library('dianda@1.0')
def version = determineVersion()

node {
    genericPipeline(
	version: version,

	build: {
            sh 'npm install'
            sh 'npm run build'
            buildImageViaRemote(projectName: getProjectName(),
                version: version,
                files: "Dockerfile node_modules build public package.json brsa");
       }
    )
}
