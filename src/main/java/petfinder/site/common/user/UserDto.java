package petfinder.site.common.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.codehaus.jackson.annotate.JsonIgnore;

import alloy.util.Identifiable;
import alloy.util.Momento;
import petfinder.site.common.pet.PetDto;

/**
 * Created by jlutteringer on 8/23/17.
 */
public class UserDto implements Momento<String> {
	private String principal;
	private List<String> roles;
	private UserType type;

	private Map<String, Object> attributes;
	private String myNewField;
	private String firstName;
	private String lastName;

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public void setType(UserType type) {
		this.type = type;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getGender() {
		return gender;
	}

	public String getZipcode() {
		return zipcode;
	}

	private String gender;
	private String zipcode;

	private UserDto() {

	}

	public UserDto(String principal, List<String> roles, String firstName, String lastName, String gender, String zipcode, UserType type, Map<String, Object> attributes) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.zipcode = zipcode;
		this.principal = principal;
		this.roles = roles;
		this.attributes = attributes;
		this.type = type;
	}

	public UserDto(String principal) {
		this.principal = principal;
	}

	public String getPrincipal() {
		return principal;
	}

	public List<String> getRoles() {
		return roles;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public UserType getType() {
		return type;
	}

	public String getMyNewField() {
		return myNewField;
	}

	public void setMyNewField(String myNewField) {
		this.myNewField = myNewField;
	}

	@JsonIgnore
	@Override
	public String getMomento() {
		return principal;
	}

	public enum UserType {
		OWNER, SITTER, BOTH
	}
}