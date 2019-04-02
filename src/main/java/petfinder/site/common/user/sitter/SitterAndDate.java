package petfinder.site.common.user.sitter;

import petfinder.site.common.user.UserDto;

public class SitterAndDate {
    private SitterAvailabilityDto availability;
    private UserDto sitter;

    public SitterAndDate() {
    }

    public SitterAndDate(SitterAvailabilityDto availability, UserDto sitter) {
        this.availability = availability;
        this.sitter = sitter;
    }

    public SitterAvailabilityDto getAvailability() {
        return availability;
    }

    public void setAvailability(SitterAvailabilityDto availability) {
        this.availability = availability;
    }

    public UserDto getSitter() {
        return sitter;
    }

    public void setSitter(UserDto sitter) {
        this.sitter = sitter;
    }
}
