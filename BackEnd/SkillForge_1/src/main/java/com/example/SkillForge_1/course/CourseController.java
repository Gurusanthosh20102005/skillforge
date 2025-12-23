package com.example.SkillForge_1.course;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

	private final CourseService courseService;

	public CourseController(CourseService courseService) {
		this.courseService = courseService;
	}

	@PostMapping
	@PreAuthorize("hasAnyRole('Instructor','Admin')")
	public ResponseEntity<?> createCourse(@RequestBody Course course, java.security.Principal principal) {
		try {
			String creatorEmail = principal != null ? principal.getName() : null;
			if (creatorEmail == null) return ResponseEntity.status(401).body("Unauthorized");
			Course saved = courseService.createCourse(course, creatorEmail);
			return ResponseEntity.ok(saved);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping
	public List<Course> listCourses() {
		return courseService.getAllCourses();
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getCourse(@PathVariable Long id) {
		return courseService.getCourse(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/{id}")
	@PreAuthorize("hasAnyRole('Instructor','Admin')")
	public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course course) {
		try {
			Course updated = courseService.updateCourse(id, course);
			return ResponseEntity.ok(updated);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyRole('Instructor','Admin')")
	public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
		courseService.deleteCourse(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/{courseId}/topics")
	@PreAuthorize("hasAnyRole('Instructor','Admin')")
	public ResponseEntity<?> addTopic(@PathVariable Long courseId, @RequestBody Topic topic) {
		try {
			Topic saved = courseService.addTopic(courseId, topic);
			return ResponseEntity.ok(saved);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/{courseId}/topics/{topicId}/materials")
	@PreAuthorize("hasAnyRole('Instructor','Admin')")
	public ResponseEntity<?> addMaterial(@PathVariable Long courseId,
										 @PathVariable Long topicId,
										 @RequestBody Material material) {
		try {
			Material saved = courseService.addMaterial(courseId, topicId, material);
			return ResponseEntity.ok(saved);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@PostMapping("/{courseId}/topics/{topicId}/materials/upload")
	@PreAuthorize("hasAnyRole('Instructor','Admin')")
	public ResponseEntity<?> uploadMaterial(@PathVariable Long courseId,
											@PathVariable Long topicId,
											@RequestParam("file") org.springframework.web.multipart.MultipartFile file,
											@RequestParam(value = "title", required = false) String title,
											@RequestParam(value = "type", required = false) String type,
											@RequestParam(value = "difficulty", required = false) String difficulty) {
		try {
			if (file == null || file.isEmpty()) return ResponseEntity.badRequest().body("No file provided");

			// save file to uploads folder
			java.nio.file.Path uploads = java.nio.file.Paths.get("uploads");
			java.nio.file.Files.createDirectories(uploads);
			String filename = System.currentTimeMillis() + "_" + java.util.Objects.requireNonNull(file.getOriginalFilename()).replaceAll("\\s+","_");
			java.nio.file.Path dest = uploads.resolve(filename);
			try (java.io.InputStream in = file.getInputStream()) {
				java.nio.file.Files.copy(in, dest, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
			}

			Material material = new Material();
			material.setTitle(title != null ? title : file.getOriginalFilename());
			material.setType(type != null ? type : "File");
			material.setUrl(dest.toString());
			material.setDifficulty(difficulty != null ? difficulty : "Medium");

			Material saved = courseService.addMaterial(courseId, topicId, material);
			return ResponseEntity.ok(saved);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
}
