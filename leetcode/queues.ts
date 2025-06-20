// Queue Problems

const countStudents = (students: number[], sandwiches: number[]): number => {
  let remainingStudents = students.length;
  let queue: number[] = [];

  for (let student of students) {
    queue.push(student);
  }

  for (let sandwich of sandwiches) {
    let studentsChecked = 0;

    while (studentsChecked < queue.length && queue[0] !== sandwich) {
      let student = queue.shift()!;
      queue.push(student);
      studentsChecked++;
    }

    if (queue[0] === sandwich) {
      queue.shift();
      remainingStudents--;
    } else {
      break;
    }
  }

  return remainingStudents;
};
