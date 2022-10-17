/* eslint-disable global-require */
const {load} = require('cheerio');
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
			const $ = load(text);
			expect($('[data-testid="name-input"]').is('input')).toBe(true);
			expect($('[data-testid="creditHours-input"]').is('input')).toBe(true);
		});

		it('should create a course & render create course form with success message', async() => {
			const {text, status} = await request(server).post('/courses/create/').send({name: 'course1', creditHours: 3});
			expect(status).toBe(200);
			const $ = load(text);
			expect($('.message-container :contains("success")').length).toBeTruthy();
		});

		it('should not create a course & render create course form with error message', async() => {
			const {text, status} = await request(server).post('/courses/create/').send({name: 'course1', creditHours: 0});
			expect(status).toBe(400);
			const $ = load(text);
			expect($('.message-container :contains("success")').length).toBeFalsy();
			expect($('.message-container :contains("creditHours")').length).toBeTruthy();
		});

		it('should not create a course & render create course form with error message', async() => {
			const {text, status} = await request(server).post('/courses/create/').send({name: 'c', creditHours: 3});
			expect(status).toBe(400);
			const $ = load(text);
			expect($('.message-container :contains("success")').length).toBeFalsy();
			expect($('.message-container :contains("name")').length).toBeTruthy();
		});
	});

	describe('getCourse', () => {
		it('should render the 2nd course details', async() => {
			const courses = [{name: 'course1', creditHours: 3}, {name: 'course2', creditHours: 2}];
			await coursesModel.bulkCreate(courses);

			const selectedCourse = await coursesModel.findOne({where: {name: 'course2'}});
			const {id} = selectedCourse;

			const {text, status} = await request(server).get(`/courses/${id}/`);
			expect(status).toBe(200);
			expect(text).toContain(`value="${selectedCourse.name}"`);
			expect(text).toContain(`value="${selectedCourse.creditHours}"`);
		});
	});
});
