/* eslint-disable global-require */
const request = require('supertest');
const {coursesModel} = require('../../../models/courses');

let server;

describe('views/courses', () => {
	beforeEach(async() => {
		server = require('../../../app');
		await coursesModel.destroy({truncate: true});
	});

	afterEach(async() => {
		await server.close();
	});

	describe('createCourse', () => {
		it('should return a create course form', async() => {
			const {text, status} = await request(server).get('/courses/create/');
			expect(status).toBe(200);
			expect(text).toContain('data-testid="name-input"');
			expect(text).toContain('data-testid="creditHours-input');
		});

		it('should create a course & render create course form with success message', async() => {
			const {text, status} = await request(server).post('/courses/create/').send({name: 'course1', creditHours: 3});
			expect(status).toBe(200);
			expect(text).toMatch(/success/);
		});

		it('should not create a course & render create course form with error message', async() => {
			const {text, status} = await request(server).post('/courses/create/').send({name: 'course1', creditHours: 0});
			expect(status).toBe(400);
			expect(text).not.toMatch(/success/);
			expect(text).toMatch(/creditHours must be in the range/);
		});

		it('should not create a course & render create course form with error message', async() => {
			const {text, status} = await request(server).post('/courses/create/').send({name: 'c', creditHours: 3});
			expect(status).toBe(400);
			expect(text).not.toMatch(/success/);
			expect(text).toContain('length');
		});
	});

	describe('getCourse', () => {
		it('should render the 2nd course details', async() => {
			const courses = [{name: 'course1', creditHours: 3}, {name: 'course2', creditHours: 4}];
			await coursesModel.bulkCreate(courses);

			const id = 2;
			const selectedCourse = courses[id - 1];

			const {text, status} = await request(server).get(`/courses/${id}/`);
			expect(status).toBe(200);
			expect(text).toContain(`value="${selectedCourse.name}"`);
			expect(text).toContain(`value="${selectedCourse.creditHours}"`);
		});
	});
});
