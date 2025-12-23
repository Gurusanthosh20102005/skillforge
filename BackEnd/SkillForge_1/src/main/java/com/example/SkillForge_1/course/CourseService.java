package com.example.SkillForge_1.course;

import com.example.SkillForge_1.model.UserAuthentication;
import com.example.SkillForge_1.repository.UserAuthenticationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

	private final CourseRepository courseRepository;
	private final UserAuthenticationRepository userRepository;
	private final TopicRepository topicRepository;
	private final MaterialRepository materialRepository;

	public CourseService(CourseRepository courseRepository,
						 UserAuthenticationRepository userRepository,
						 TopicRepository topicRepository,
						 MaterialRepository materialRepository) {
		this.courseRepository = courseRepository;
		this.userRepository = userRepository;
		this.topicRepository = topicRepository;
		this.materialRepository = materialRepository;
	}

	public Course createCourse(Course course, String creatorEmail) throws Exception {
		Optional<UserAuthentication> opt = userRepository.findByEmail(creatorEmail);
		if (opt.isEmpty()) throw new Exception("Creator not found");
		UserAuthentication user = opt.get();
		course.setUser(user);
		return courseRepository.save(course);
	}

	public List<Course> getAllCourses() {
		return courseRepository.findAll();
	}

	public Optional<Course> getCourse(Long id) { return courseRepository.findById(id); }

	public Course updateCourse(Long id, Course updated) throws Exception {
		Course existing = courseRepository.findById(id).orElseThrow(() -> new Exception("Course not found"));
		existing.setTitle(updated.getTitle());
		existing.setDescription(updated.getDescription());
		return courseRepository.save(existing);
	}

	public void deleteCourse(Long id) { courseRepository.deleteById(id); }

	public Topic addTopic(Long courseId, Topic topic) throws Exception {
		Course course = courseRepository.findById(courseId).orElseThrow(() -> new Exception("Course not found"));
		topic.setCourse(course);
		return topicRepository.save(topic);
	}

	public Material addMaterial(Long courseId, Long topicId, Material material) throws Exception {
		Course course = courseRepository.findById(courseId).orElseThrow(() -> new Exception("Course not found"));
		Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new Exception("Topic not found"));
		material.setTopic(topic);
		return materialRepository.save(material);
	}
}
