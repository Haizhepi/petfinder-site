package petfinder.site.common.user.sitter;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.List;

public class SitterAvailabilityDto implements Momento<String> {
    private String principal;
    //private List<Boolean> availability;
    private String availability;
    public SitterAvailabilityDto(String principal, String availability) {
        this.principal = principal;
        this.availability = availability;
    }

    private SitterAvailabilityDto() {}
    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    @JsonIgnore
    @Override
    public String getMomento() {
        return principal;
    }

}
