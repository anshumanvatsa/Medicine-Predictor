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
          # python3/venv/pip must already be on the machine
          ${PYTHON} -m venv ${VENV} || true
          . ${VENV}/bin/activate
          pip install --upgrade pip
          if [ -f requirements.txt ]; then
            pip install -r requirements.txt
          else
            echo "No requirements.txt found – continuing"
          fi
        '''
      }
    }
    stage('Run') {
      steps {
        sh '''
          set -e
          . ${VENV}/bin/activate
          # TODO: replace with your real start command, e.g.:
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
