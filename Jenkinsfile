pipeline {
  agent any
  options { timestamps() }
  environment {
    VENV = "venv"
    PYTHON = "python3"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Setup Python & deps') {
      steps {
        sh '''
          set -e
          sudo apt-get update -y
          sudo apt-get install -y python3 python3-venv python3-pip
          test -d "${VENV}" || ${PYTHON} -m venv ${VENV}
          . ${VENV}/bin/activate
          pip install --upgrade pip
          if [ -f requirements.txt ]; then
            pip install -r requirements.txt
          fi
        '''
      }
    }
    stage('Run') {
      steps {
        sh '''
          set -e
          . ${VENV}/bin/activate
          # TODO: replace with your real start command:
          # python3 app.py
          # uvicorn main:app --host 0.0.0.0 --port 8000
          echo "Replace me with your app start command"
        '''
      }
    }
  }
  post {
    always {
      sh 'tail -n 100 app.log || true'
      archiveArtifacts artifacts: 'app.log', allowEmptyArchive: true
    }
  }
}
