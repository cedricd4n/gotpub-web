from flask import Flask, jsonify, request
from .entities.entity import Session, engine, Base
from flask_cors import CORS
# from .entities.pub import Pub
from .entities.pub import Pub, ExamSchema
# generate database schema


app = Flask(__name__)

CORS(app)
# if needed, generate database schema
Base.metadata.create_all(engine)


@app.route('/exams')
def get_exams():
    # fetching from the database
    session = Session()
    exam_objects = session.query(Pub).all()

    # transforming into JSON-serializable objects
    schema = ExamSchema(many=True)
    exams = schema.dump(exam_objects)

    # serializing as JSON
    session.close()
    return jsonify(exams)


@app.route('/exams', methods=['POST'])
def add_exam():
    posted_exam_data = request.get_json()
    
    posted_exam = ExamSchema(only=('title', 'description')).load(posted_exam_data)
    
    # Create a new exam instance
    exam = Pub(title=posted_exam.get('title'), description=posted_exam.get('description'), created_by="HTTP post request")
    
    # Persist exam
    session = Session()
    session.add(exam)
    session.commit()

    # # Return created exam
    new_exam = ExamSchema().dump(exam)
    session.close()
    return jsonify(new_exam), 201

if __name__ == "__main__":
    app.run(debug=True)