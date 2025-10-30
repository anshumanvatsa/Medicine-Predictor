pipeline {
  agent any
  options { timestamps() }
  environment {
    VENV   = "venv"
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

          # If your app.py contains Flask and uses `flask run`, this exposes it publicly:
          export FLASK_APP=app.py
          nohup ${PYTHON} -m flask run --host=0.0.0.0 --port=8000 > app.log 2>&1 &

          echo $! > app.pid
          sleep 3
          echo "App started. Visit: http://$(curl -s http://checkip.amazonaws.com):8000/"
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
