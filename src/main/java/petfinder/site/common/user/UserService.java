package petfinder.site.common.user;

import java.time.Duration;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import alloy.util.AlloyAuthentication;
import alloy.util.Wait;
import alloy.util._Lists;
import alloy.util._Maps;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;
import petfinder.site.common.pet.PetDto;
import petfinder.site.common.user.UserDto.UserType;

/**
 * Services are Spring concepts for classes which manage the application's buisness logic.
 */
@Service
public class UserService {
	@Autowired
	private UserDao userDao;


	@Autowired
	private PasswordEncoder passwordEncoder;

	public Optional<UserDto> findUserByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal).map(UserAuthenticationDto::getUser);
	}

	public Boolean checkEmailExist(String principal) {
		Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principal);
		if (temp.isPresent()) {
			return true;
		}
		return false;
	}

	public Boolean checkAnswer(String answer, String principal, String newPassword) {
		Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principal);
		if (temp.isPresent()) {
			if (temp.get().getUser().getSecurityAnswer().equals(answer)) {
				passwordUpdate(newPassword, temp.get());
				return true;
			}
			return false;
		}
		return false;

	}

	public String getQuestion(String principal) {
		Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principal);
		if (temp.isPresent()) {
			return temp.get().getUser().getSecurtyQuestion();
		}
		else {
			return null;
		}
	}

	public Optional<UserAuthenticationDto> findUserAuthenticationByPrincipal(String principal) {
		return userDao.findUserByPrincipal(principal);
	}

	public static class RegistrationRequest {
		private String principal;
		private String password;
		private String firstName;
		private String lastName;
		private String userType;
		private String securityAnswer;
		private String securityQuestion;

		public String getSecurityQuestion() {
			return securityQuestion;
		}

		public void setSecurityQuestion(String securityQuestion) {
			this.securityQuestion = securityQuestion;
		}

		public void setUserType(String userType) {
			this.userType = userType;
		}


		public UserType getUserType() {
			if (userType.equalsIgnoreCase("owner")) {
				return UserType.OWNER;
			}
			else if(userType.equalsIgnoreCase("sitter")){
				return UserType.SITTER;
			}
			else  {
				return UserType.BOTH;
			}
		}

		public String getSecurityAnswer() {
			return securityAnswer;
		}

		public void setSecurityAnswer(String securityAnswer) {
			this.securityAnswer = securityAnswer;
		}
		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public String getZipcode() {
			return zipcode;
		}

		public void setZipcode(String zipcode) {
			this.zipcode = zipcode;
		}

		private String gender;
		private String zipcode;
		private Map<String, Object> attributes;

		public String getPrincipal() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Map<String, Object> getAttributes() {
			return attributes;
		}

		public void setAttributes(Map<String, Object> attributes) {
			this.attributes = attributes;
		}
	}

	public static class UpdatePasswordRequest {
		private String principal;
		private String newPassword;
		private String answer;

		public UpdatePasswordRequest(String principal, String newPassword, String answer) {
			this.principal = principal;
			this.newPassword = newPassword;
			this.answer = answer;
		}

		public UpdatePasswordRequest() {
		}

		public String getPrincipal() {
			return principal;
		}

		public void setPrincipal(String principal) {
			this.principal = principal;
		}

		public String getNewPassword() {
			return newPassword;
		}

		public void setNewPassword(String newPassword) {
			this.newPassword = newPassword;
		}

		public String getAnswer() {
			return answer;
		}

		public void setAnswer(String answer) {
			this.answer = answer;
		}
	}
	public UserDto register(RegistrationRequest request) {
		UserAuthenticationDto userAuthentication = new UserAuthenticationDto(
				new UserDto(request.getPrincipal(), _Lists.list("ROLE_USER"),
						request.getFirstName(), request.getLastName(),
						request.getGender(), request.getZipcode(),
						request.getUserType(), request.getAttributes(), request.getSecurityAnswer(), request.getSecurityQuestion()),
				passwordEncoder.encode(request.getPassword()));
		userDao.save(userAuthentication);
		return userAuthentication.getUser();
	}

	public UserDto passwordUpdate(String password, UserAuthenticationDto userAuthenticationDto) {
		UserDto u = null;
		userAuthenticationDto.setPassword(passwordEncoder.encode(password));
		u = userAuthenticationDto.getUser();
		userDao.save(userAuthenticationDto);
		return u;
	}

	public UserPetDto save(UserPetDto userPetDto) {
		return userDao.save(userPetDto);
	}

	public UserDto update(UpdateRequest request){
		UserDto u = null;
		UserAuthenticationDto userAuthentication = null;

		// Find the user corresponding to the given principal
		if(userDao.findUserByPrincipal(request.getPrincipal()).isPresent()){
			userAuthentication = userDao.findUserByPrincipal(request.getPrincipal()).get();

			// Make the changes to user's information
			u = userAuthentication.getUser();
			u.setFirstName(request.getFirstName());
			u.setLastName(request.getLastName());
			u.setGender(request.getGender());
			u.setZipcode(request.getZipcode());
			userDao.save(userAuthentication);
		}
		return u;
	}


	public List<PetDto> findPets(UserDto user) {
		return userDao.findPets(user);
	}

	public List<BookingDto> findBookings(UserDto user) {
		List<BookingDto> list = userDao.findBookings(user);
		for (BookingDto bookingDto: list) {
			bookingDto.setStartDate(bookingDto.getStartDate().substring(0, 10));
			bookingDto.setEndDate(bookingDto.getEndDate().substring(0, 10));
			bookingDto.setStartTime(bookingDto.getStartTime().substring(11, 19));
			bookingDto.setEndTime(bookingDto.getEndTime().substring(11, 19));
		}
		return list;
	}

	public List<NotificationDto> findNotifications(UserDto user) {
		return userDao.findNotification(user);
	}

	public String getRandQuestion() {
		List<String> stringList = new ArrayList<>();
		Random rand = new Random();
		stringList.add("What was your childhood nickname?");
		stringList.add("In what city or town did your mother and father meet?");
		stringList.add("What is your favorite Overwatch League team?");
		stringList.add("What was your favorite food as a child?");
		return stringList.get(rand.nextInt(stringList.size()));
	}
}